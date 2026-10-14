import { useState } from 'react';
import { Bookmark, ImageOff, Maximize2 } from 'lucide-react';

export default function GalleryCard({ item, index, saved, onOpen, onSave }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="card" style={{ '--i': Math.min(index, 12) }}>
      <button className="card-open" onClick={() => onOpen(item.id)} aria-label={`Open ${item.title}`}>
        <div className="card-media" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
          {failed ? (
            <div className="card-fallback"><ImageOff size={26} /><span>Photo unavailable</span></div>
          ) : (
            <img src={item.src} alt={item.alt} width={item.w} height={item.h} loading="lazy" decoding="async" onError={() => setFailed(true)} />
          )}
        </div>
        {item.isNew && <span className="badge-new">NEW</span>}
        <span className="card-overlay">
          <span className="card-meta">
            <span className="tag">{item.category}</span>
            <span className="card-title">{item.title}</span>
          </span>
          <Maximize2 className="card-expand" size={17} aria-hidden="true" />
        </span>
      </button>
      <button
        className={`save-btn ${saved ? 'is-saved' : ''}`} aria-pressed={saved}
        aria-label={saved ? `Remove ${item.title} from saved looks` : `Save ${item.title}`}
        onClick={() => onSave(item.id)}
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </article>
  );
}
