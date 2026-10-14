import SearchBar from './SearchBar.jsx';

export default function Hero({ query, onQuery, total }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-orb" aria-hidden="true" />
      <p className="eyebrow">THE VELVET ARCHIVE</p>
      <h1 id="hero-title">Your next look starts here.</h1>
      <p className="hero-copy">
        Explore our collection of cuts, colors, textures, and transformations. Find the look that feels like you.
      </p>
      <div className="hero-row">
        <SearchBar value={query} onChange={onQuery} />
        <p className="count-pill glass"><span>{total}</span> looks in the archive</p>
      </div>
    </section>
  );
}
