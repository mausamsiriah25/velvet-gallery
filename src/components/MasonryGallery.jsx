import { SearchX } from 'lucide-react';
import GalleryCard from './GalleryCard.jsx';

export default function MasonryGallery({ items, saved, onOpen, onSave, onReset, savedOnly }) {
  if (!items.length) {
    return (
      <div className="empty glass">
        <SearchX size={30} />
        <h2>{savedOnly ? 'No saved looks here yet' : 'No looks match that search'}</h2>
        <p>{savedOnly ? 'Tap the bookmark on any photo to keep it here.' : 'Try a different word or pick another category.'}</p>
        <button className="btn-primary" onClick={onReset}>Show all looks</button>
      </div>
    );
  }
  return (
    <div className="masonry">
      {items.map((item, i) => (
        <GalleryCard key={item.id} item={item} index={i} saved={saved.has(item.id)} onOpen={onOpen} onSave={onSave} />
      ))}
    </div>
  );
}
