import { useEffect, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, ChevronRight, ImageOff, Trash2, X } from 'lucide-react';

export default function ImageLightbox({ items, index, saved, onClose, onNav, onSave, onDelete }) {
  const item = items[index];
  const [failed, setFailed] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => setFailed(false), [item?.id]);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prevOverflow; prevFocus?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  if (!item) return null;
  const isSaved = saved.has(item.id);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="viewer glass-strong" role="dialog" aria-modal="true" aria-label={item.title}>
        <div className="viewer-stage">
          {failed ? (
            <div className="card-fallback"><ImageOff size={34} /><span>Photo unavailable</span></div>
          ) : (
            <img key={item.id} src={item.full} alt={item.alt} onError={() => setFailed(true)} />
          )}
          {items.length > 1 && (<>
            <button className="nav-arrow left" onClick={() => onNav(-1)} aria-label="Previous photo"><ChevronLeft size={22} /></button>
            <button className="nav-arrow right" onClick={() => onNav(1)} aria-label="Next photo"><ChevronRight size={22} /></button>
          </>)}
        </div>
        <aside className="viewer-info">
          <button ref={closeRef} className="icon-btn viewer-close" onClick={onClose} aria-label="Close viewer"><X size={20} /></button>
          <span className="tag">{item.category}</span>
          <h2>{item.title}</h2>
          <p className="viewer-desc">{item.description}</p>
          <ul className="taglist">{item.tags.map((t) => <li key={t}>#{t}</li>)}</ul>
          <div className="viewer-actions">
            <button className={`btn-ghost ${isSaved ? 'is-on' : ''}`} aria-pressed={isSaved} onClick={() => onSave(item.id)}>
              <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save look'}
            </button>
            {item.isLocal && (
              <button className="btn-ghost danger" onClick={() => onDelete(item.id)}><Trash2 size={16} /> Remove</button>
            )}
          </div>
          <p className="viewer-count">{index + 1} of {items.length}</p>
        </aside>
      </div>
    </div>
  );
}
