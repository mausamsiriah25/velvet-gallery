import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Loader2, UploadCloud, X } from 'lucide-react';
import { UPLOAD_CATEGORIES, formatBytes, validateFiles, ACCEPTED } from '../utils/imageHelpers.js';

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function AddPhotosModal({ onClose, onSubmit }) {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('Haircuts');
  const [errors, setErrors] = useState([]);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, [onClose, busy]);

  const take = (list) => {
    const { valid, errors: errs } = validateFiles([...list], items.length);
    setErrors(errs);
    setItems((p) => [...p, ...valid.map((file) => ({ id: uid(), file, url: URL.createObjectURL(file), title: '' }))]);
  };
  const drop = (e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files); };
  const removeItem = (id) => setItems((p) => {
    p.filter((i) => i.id === id).forEach((i) => URL.revokeObjectURL(i.url));
    return p.filter((i) => i.id !== id);
  });
  const setTitle = (id, title) => setItems((p) => p.map((i) => (i.id === id ? { ...i, title } : i)));

  const submit = async () => {
    if (!items.length) return setErrors(['Choose at least one photo to add.']);
    setBusy(true);
    await onSubmit(items.map(({ file, title }) => ({ file, title })), category);
    setBusy(false);
    onClose();
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <div className="modal glass-strong" role="dialog" aria-modal="true" aria-labelledby="add-title">
        <button className="icon-btn modal-x" onClick={onClose} disabled={busy} aria-label="Close"><X size={20} /></button>
        <h2 id="add-title">Add to the archive</h2>
        <p className="modal-sub">Drop your images here or browse your device.</p>

        <div
          className={`dropzone ${drag ? 'is-drag' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)} onDrop={drop}
        >
          <UploadCloud size={34} strokeWidth={1.4} />
          <p>Drag photos here</p>
          <small>JPG, PNG or WebP · up to 10 MB each</small>
          <button className="btn-ghost" onClick={() => inputRef.current?.click()}>Browse Files</button>
          <input ref={inputRef} type="file" multiple accept={ACCEPTED.join(',')} hidden
            onChange={(e) => { take(e.target.files); e.target.value = ''; }} />
        </div>

        {errors.length > 0 && (
          <ul className="errors" role="alert">
            {errors.map((m) => <li key={m}><AlertCircle size={15} />{m}</li>)}
          </ul>
        )}

        {items.length > 0 && (
          <ul className="previews">
            {items.map((i) => (
              <li key={i.id}>
                <img src={i.url} alt="" />
                <div className="preview-fields">
                  <input type="text" value={i.title} maxLength={60} placeholder="Title (optional)"
                    aria-label={`Title for ${i.file.name}`} onChange={(e) => setTitle(i.id, e.target.value)} />
                  <small>{i.file.name} · {formatBytes(i.file.size)}</small>
                </div>
                <button className="icon-btn sm" onClick={() => removeItem(i.id)} aria-label={`Remove ${i.file.name}`}><X size={15} /></button>
              </li>
            ))}
          </ul>
        )}

        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {UPLOAD_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>

        <p className="note">Photos you add are kept in this browser on this device. Other visitors won’t see them.</p>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="btn-primary" onClick={submit} disabled={busy || !items.length}>
            {busy ? <><Loader2 className="spin" size={17} /> Saving…</> : `Add to Gallery${items.length ? ` (${items.length})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
