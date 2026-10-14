# Velvet Studio: The Velvet Archive

A Pinterest-inspired salon gallery built with React and Vite. It is a static site: no backend, no API keys, no environment variables.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # test the production build locally
```

## Deploy to GitHub Pages

1. Create a GitHub repository (for example `velvet-gallery`) and push this project to the `main` branch.
2. In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**). The workflow in `.github/workflows/deploy.yml` installs, builds and publishes `dist/`.
4. Your site appears at `https://USERNAME.github.io/REPOSITORY/`.

### Base path

`vite.config.js` reads `VITE_BASE_PATH` and falls back to `./` (relative paths), so the app works from a sub-path.

- The workflow sets it automatically to `/<repository-name>/`. Renaming the repository needs no code change.
- For a user site (a repository named `USERNAME.github.io`), change `VITE_BASE_PATH` in `deploy.yml` to `/`.
- To test a sub-path build locally: `VITE_BASE_PATH=/velvet-gallery/ npm run build && npm run preview`.

## Features

- Masonry gallery (CSS columns, 2 / 3 / 4 / 5 columns by screen width) with mixed aspect ratios, lazy images and fallback tiles for failed loads
- Category chips and search that work together; result count, empty states and reset
- Save / bookmark looks, with a Saved Looks filter, persisted in `localStorage`
- Quick-view viewer with previous/next, arrow keys, Escape, click-outside and scroll lock
- Add Photos: drag and drop or browse, multi-select, previews, per-photo titles, category, validation (JPG/PNG/WebP, 10 MB, 20 files)
- Local persistence: image blobs and metadata in IndexedDB; falls back to session-only with a clear warning if storage is full or unavailable
- Reduced-motion support, keyboard focus styles, touch-friendly controls

## Limitations

- **Added photos stay in the visitor's own browser.** There is no server, so other visitors will not see them. To add photos for everyone, put them in `public/images/` and list them in `src/data/initialImages.js`.
- The starter photos load from Unsplash by photo ID. Check each one in your browser and swap any that don't suit the salon (or replace them with the salon's own photos). Failed loads show a placeholder tile.
- Clearing site data in the browser removes locally added photos and saved looks.

## Structure

```
src/
  components/   Navbar, Hero, SearchBar, CategoryFilters, MasonryGallery, GalleryCard,
                AddPhotosModal, ImageLightbox, Toast, Footer
  data/         initialImages.js
  hooks/        useGallery.js
  utils/        imageStorage.js (IndexedDB), imageHelpers.js
  styles/       global.css, gallery.css, components.css
```
