import { useCallback, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CategoryFilters from './components/CategoryFilters.jsx';
import MasonryGallery from './components/MasonryGallery.jsx';
import AddPhotosModal from './components/AddPhotosModal.jsx';
import ImageLightbox from './components/ImageLightbox.jsx';
import Toast from './components/Toast.jsx';
import Footer from './components/Footer.jsx';
import { useGallery } from './hooks/useGallery.js';

export default function App() {
  const g = useGallery();
  const [adding, setAdding] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const galleryRef = useRef(null);

  const toast = useCallback((msg, tone = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === 'warn' ? 6000 : 3200);
  }, []);

  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const navigate = (cat) => { g.setCategory(cat); g.setSavedOnly(false); scrollToGallery(); };
  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => document.getElementById('search-input')?.focus(), 250);
  };

  const onSubmit = async (entries, cat) => {
    const { count, persisted } = await g.addFiles(entries, cat);
    g.setCategory('All Looks'); g.setSavedOnly(false); g.setQuery('');
    if (persisted) toast(`${count} ${count === 1 ? 'photo' : 'photos'} added to this browser’s archive.`);
    else toast(`${count} ${count === 1 ? 'photo' : 'photos'} added for this session only. Browser storage is full or unavailable.`, 'warn');
  };

  const openIndex = g.visible.findIndex((i) => i.id === openId);
  const nav = useCallback((d) => {
    setOpenId((id) => {
      const idx = g.visible.findIndex((i) => i.id === id);
      return g.visible[(idx + d + g.visible.length) % g.visible.length]?.id ?? null;
    });
  }, [g.visible]);

  const del = (id) => {
    const idx = g.visible.findIndex((i) => i.id === id);
    const next = g.visible[idx + 1] || g.visible[idx - 1];
    g.removeLocal(id);
    setOpenId(next ? next.id : null);
    toast('Photo removed from this browser.');
  };

  const label = g.savedOnly ? 'saved' : g.category === 'All Looks' ? '' : g.category.toLowerCase();

  return (
    <>
      <Navbar
        category={g.category} savedOnly={g.savedOnly} savedCount={g.saved.size}
        onNavigate={navigate} onSearch={focusSearch} onAdd={() => setAdding(true)}
        onSaved={() => { g.setSavedOnly((s) => !s); scrollToGallery(); }}
      />
      <main>
        <Hero query={g.query} onQuery={g.setQuery} total={g.all.length} />
        <section id="gallery" ref={galleryRef} className="gallery-section" aria-label="Gallery">
          <CategoryFilters
            category={g.category} onCategory={(c) => { g.setCategory(c); g.setSavedOnly(false); }}
            savedOnly={g.savedOnly} onSaved={() => g.setSavedOnly((s) => !s)} savedCount={g.saved.size}
          />
          <p className="results" aria-live="polite">
            {g.visible.length} {label} {g.visible.length === 1 ? 'look' : 'looks'}{g.query && <> for “{g.query}”</>}
          </p>
          <MasonryGallery items={g.visible} saved={g.saved} savedOnly={g.savedOnly}
            onOpen={setOpenId} onSave={g.toggleSave} onReset={g.reset} />
        </section>
      </main>
      <Footer onNavigate={navigate} />
      {adding && <AddPhotosModal onClose={() => setAdding(false)} onSubmit={onSubmit} />}
      {openIndex >= 0 && (
        <ImageLightbox items={g.visible} index={openIndex} saved={g.saved}
          onClose={() => setOpenId(null)} onNav={nav} onSave={g.toggleSave} onDelete={del} />
      )}
      <Toast toasts={toasts} />
    </>
  );
}
