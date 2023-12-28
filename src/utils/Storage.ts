// TODO: A simple key-value store. Based on local storage for now, 
// but could be extended to support server-side
export default class Storage<V, K extends string> {
  save(key: K, value: V) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: K): V | null {
    const saved = localStorage.getItem(key);
    return saved == null ? null : JSON.parse(saved);
  }
}