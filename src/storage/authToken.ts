import { AUTH_TOKEN_STORAGE } from './storageConfig';

export function storageAuthTokenSave(token: string) {
  sessionStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export function storageAuthTokenGet() {
  return sessionStorage.getItem(AUTH_TOKEN_STORAGE);
}
