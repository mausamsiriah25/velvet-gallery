import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search glass" role="search">
      <Search size={18} aria-hidden="true" />
      <input
        id="search-input" type="search" value={value} placeholder="Search balayage, bob, curls…"
        onChange={(e) => onChange(e.target.value)} aria-label="Search the archive" autoComplete="off"
      />
      {value && (
        <button className="search-clear" onClick={() => { onChange(''); document.getElementById('search-input')?.focus(); }} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
