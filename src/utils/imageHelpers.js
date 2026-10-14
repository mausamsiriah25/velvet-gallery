export const CATEGORIES = [
  'All Looks', 'Haircuts', 'Hair Color', 'Balayage', 'Blonde',
  'Brunette', 'Curly Hair', 'Transformations', 'Salon Interiors',
];
export const UPLOAD_CATEGORIES = CATEGORIES.slice(1);

export const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_BYTES = 10 * 1024 * 1024;
export const MAX_FILES = 20;

export const formatBytes = (n) =>
  n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

export function validateFiles(files, existing = 0) {
  const valid = [];
  const errors = [];
  for (const f of files) {
    if (!ACCEPTED.includes(f.type)) errors.push(`${f.name}: use a JPG, PNG or WebP image.`);
    else if (f.size > MAX_BYTES) errors.push(`${f.name}: ${formatBytes(f.size)} is over the ${formatBytes(MAX_BYTES)} limit.`);
    else if (existing + valid.length >= MAX_FILES) errors.push(`${f.name}: add up to ${MAX_FILES} photos at a time.`);
    else valid.push(f);
  }
  return { valid, errors };
}

export function readDimensions(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { resolve({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
    img.onerror = () => { resolve({ w: 4, h: 5 }); URL.revokeObjectURL(url); };
    img.src = url;
  });
}

export function matchesQuery(img, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return [img.title, img.category, img.description, ...(img.tags || [])]
    .join(' ')
    .toLowerCase()
    .includes(needle);
}
