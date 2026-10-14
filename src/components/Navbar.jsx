import { Plus, Search, Bookmark } from 'lucide-react';

const LINKS = [
  ['Gallery', 'All Looks'],
  ['Hairstyles', 'Haircuts'],
  ['Transformations', 'Transformations'],
  ['Salon', 'Salon Interiors'],
];

export default function Navbar({ category, savedOnly, savedCount, onNavigate, onSearch, onSaved, onAdd }) {
  return (
    <header className="nav-wrap">
      <nav className="nav glass" aria-label="Main">
        <a className="brand" href="#gallery" onClick={(e) => { e.preventDefault(); onNavigate('All Looks'); }} aria-label="Velvet Studio gallery home">
          <svg className="mono" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M12 12l8 16 8-16" fill="none" stroke="#F5F0EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="brand-text">
            <strong>VELVET STUDIO</strong>
            <small>HAIR • ART • EXPRESSION</small>
          </span>
        </a>

        <ul className="nav-links">
          {LINKS.map(([label, cat]) => (
            <li key={label}>
              <button
                className={`nav-link ${category === cat && !savedOnly ? 'is-active' : ''}`}
                aria-current={category === cat && !savedOnly ? 'page' : undefined}
                onClick={() => onNavigate(cat)}
              >{label}</button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onSearch} aria-label="Search the archive"><Search size={19} /></button>
          <button className={`icon-btn ${savedOnly ? 'is-on' : ''}`} onClick={onSaved} aria-pressed={savedOnly} aria-label={`Saved looks (${savedCount})`}>
            <Bookmark size={19} fill={savedOnly ? 'currentColor' : 'none'} />
          </button>
          <button className="btn-primary" onClick={onAdd}>
            <Plus size={17} strokeWidth={2.2} /><span>Add Photos</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
