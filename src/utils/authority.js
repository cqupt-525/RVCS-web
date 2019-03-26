export function getAuthority() {
  return localStorage.getItem('authority')
    || sessionStorage.getItem('authority')
}

export function setAuthority(authority, saveLocal = false) {
  if (saveLocal) {
    localStorage.setItem('authority', authority)
  }
  sessionStorage.setItem('authority', authority)
}
