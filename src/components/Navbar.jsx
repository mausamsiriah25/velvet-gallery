
import { useState } from 'react';
import {
  Plus,
  Search,
  Bookmark,
  Menu,
  X,
} from 'lucide-react';

const LINKS = [
  ['Gallery', 'All Looks'],
  ['Hairstyles', 'Haircuts'],
  ['Transformations', 'Transformations'],
  ['Salon', 'Salon Interiors'],
];

export default function Navbar({
  category,
  savedOnly,
  savedCount,
  onNavigate,
  onSearch,
  onSaved,
  onAdd,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (cat) => {
    onNavigate(cat);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    setMenuOpen(false);
    onSearch();
  };

  const handleSaved = () => {
    onSaved();
    setMenuOpen(false);
  };

  const handleAdd = () => {
    setMenuOpen(false);
    onAdd();
  };

  return (
    <header className="nav-wrap">
      <nav
        className={`nav glass ${menuOpen ? 'menu-open' : ''}`}
        aria-label="Main navigation"
      >
        <a
          className="brand"
          href="#gallery"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('All Looks');
          }}
          aria-label="Velvet Studio gallery home"
        >
          <svg
            className="mono"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M12 12l8 16 8-16"
              fill="none"
              stroke="#F5F0EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="brand-text">
            <strong>VELVET STUDIO</strong>
            <small>HAIR • ART • EXPRESSION</small>
          </span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {LINKS.map(([label, cat]) => (
            <li key={label}>
              <button
                className={`nav-link ${
                  category === cat && !savedOnly
                    ? 'is-active'
                    : ''
                }`}
                aria-current={
                  category === cat && !savedOnly
                    ? 'page'
                    : undefined
                }
                onClick={() => navigateTo(cat)}
              >
                {label}
              </button>
            </li>
          ))}

          <li className="mobile-saved-link">
            <button
              className={`nav-link ${savedOnly ? 'is-active' : ''}`}
              onClick={handleSaved}
            >
              <Bookmark size={16} />
              Saved Looks ({savedCount})
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={handleSearch}
            aria-label="Search the archive"
            title="Search"
          >
            <Search size={19} />
          </button>

          <button
            className={`icon-btn ${savedOnly ? 'is-on' : ''}`}
            onClick={handleSaved}
            aria-pressed={savedOnly}
            aria-label={`Saved looks (${savedCount})`}
            title="Saved looks"
          >
            <Bookmark
              size={19}
              fill={savedOnly ? 'currentColor' : 'none'}
            />
          </button>

          <button
            className="btn-primary nav-add"
            onClick={handleAdd}
            aria-label="Add photos"
          >
            <Plus size={17} strokeWidth={2.2} />
            <span>Add Photos</span>
          </button>

          <button
            className="icon-btn mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            title={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
