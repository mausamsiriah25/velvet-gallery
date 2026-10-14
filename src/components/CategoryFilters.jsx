import { Bookmark } from 'lucide-react';
import { CATEGORIES } from '../utils/imageHelpers.js';

export default function CategoryFilters({ category, onCategory, savedOnly, onSaved, savedCount }) {
  return (
    <div className="filters">
      <div className="chips" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip ${category === c ? 'is-active' : ''}`} aria-pressed={category === c} onClick={() => onCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      <button className={`chip chip-saved ${savedOnly ? 'is-active' : ''}`} aria-pressed={savedOnly} onClick={onSaved}>
        <Bookmark size={15} fill={savedOnly ? 'currentColor' : 'none'} /> Saved Looks <b>{savedCount}</b>
      </button>
    </div>
  );
}
