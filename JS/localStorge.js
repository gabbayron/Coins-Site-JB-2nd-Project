export function toLocalStorage(obj, key) {
    localStorage.setItem(key, JSON.stringify(obj))
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function fromLocalStorage (key) {
   return localStorage.getItem(key)
}