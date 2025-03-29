import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export function storageAuthTokenSave(token: string) {
  // Verifica se está no cliente (navegador)
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE, token);
  }
}

export function storageAuthTokenGet() {
  try {
    // Verifica se está no cliente (navegador)
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(AUTH_TOKEN_STORAGE);
    }
  } catch (error) {
    console.log(error);
  }
}
