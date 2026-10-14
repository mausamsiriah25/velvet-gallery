// Photos added through the site stay in this browser's IndexedDB.
// Nothing is sent to a server.
const DB = 'velvet-archive';
const STORE = 'photos';

function open() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run(mode, fn) {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => { db.close(); resolve(req?.result); };
    tx.onerror = tx.onabort = () => { db.close(); reject(tx.error || new Error('Storage failed')); };
  });
}

export const getAll = () => run('readonly', (s) => s.getAll());
export const put = (record) => run('readwrite', (s) => s.put(record));
export const remove = (id) => run('readwrite', (s) => s.delete(id));
