import { ArrowUp } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const top = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer">
      <div>
        <strong className="foot-brand">VELVET STUDIO</strong>
        <p>A little inspiration. A whole new you.</p>
      </div>
      <nav aria-label="Footer">
        {[['Gallery', 'All Looks'], ['Hairstyles', 'Haircuts'], ['Transformations', 'Transformations'], ['Salon', 'Salon Interiors']].map(([l, c]) => (
          <button key={l} onClick={() => onNavigate(c)}>{l}</button>
        ))}
      </nav>
      <button className="btn-ghost" onClick={top}><ArrowUp size={16} /> Back to top</button>
      <small>© {new Date().getFullYear()} Velvet Studio. All rights reserved.</small>
    </footer>
  );
}
