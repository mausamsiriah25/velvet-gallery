import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_IMAGES } from '../data/initialImages';
import * as store from '../utils/imageStorage';
import { matchesQuery, readDimensions } from '../utils/imageHelpers';

const SAVED_KEY = 'velvet:saved';

const readSaved = () => {
  try { return new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')); }
  catch { return new Set(); }
};

const toItem = (r, src, isNew) => ({
  id: r.id, src, full: src, w: r.w, h: r.h, category: r.category,
  title: r.title, description: r.description, tags: r.tags,
  alt: r.title, isLocal: true, isNew,
});

export function useGallery() {
  const [local, setLocal] = useState([]);
  const [saved, setSaved] = useState(readSaved);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Looks');
  const [savedOnly, setSavedOnly] = useState(false);
  const urls = useRef(new Set());

  const makeUrl = (blob) => {
    const u = URL.createObjectURL(blob);
    urls.current.add(u);
    return u;
  };

  useEffect(() => {
    let live = true;
    store.getAll()
      .then((rows) => {
        if (!live) return;
        rows.sort((a, b) => b.createdAt - a.createdAt);
        setLocal(rows.map((r) => toItem(r, makeUrl(r.blob), false)));
      })
      .catch(() => {});
    const held = urls.current;
    return () => { live = false; held.forEach(URL.revokeObjectURL); held.clear(); };
  }, []);

  const addFiles = useCallback(async (entries, cat) => {
    const added = [];
    let persisted = true;
    for (const [i, { file, title }] of entries.entries()) {
      const { w, h } = await readDimensions(file);
      const rec = {
        id: `local-${Date.now()}-${i}`, blob: file, w, h, category: cat,
        title: title.trim() || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
        description: `Added to the archive under ${cat}.`,
        tags: [cat.toLowerCase(), 'new'], createdAt: Date.now() + i,
      };
      try { await store.put(rec); } catch { persisted = false; }
      added.push(toItem(rec, makeUrl(file), true));
    }
    setLocal((prev) => [...added.reverse(), ...prev]);
    return { count: added.length, persisted };
  }, []);

  const removeLocal = useCallback((id) => {
    store.remove(id).catch(() => {});
    setLocal((prev) => prev.filter((i) => i.id !== id));
    setSaved((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, []);

  useEffect(() => {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...saved])); } catch { /* storage unavailable */ }
  }, [saved]);

  const toggleSave = useCallback((id) => {
    setSaved((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const all = useMemo(() => [...local, ...INITIAL_IMAGES], [local]);
  const visible = useMemo(
    () => all.filter((i) =>
      (category === 'All Looks' || i.category === category) &&
      (!savedOnly || saved.has(i.id)) && matchesQuery(i, query)),
    [all, category, savedOnly, saved, query]
  );

  const reset = useCallback(() => { setQuery(''); setCategory('All Looks'); setSavedOnly(false); }, []);

  return {
    all, visible, saved, query, setQuery, category, setCategory,
    savedOnly, setSavedOnly, addFiles, removeLocal, toggleSave, reset,
  };
}
