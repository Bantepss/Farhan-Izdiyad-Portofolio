export {};

declare global {
  interface Window {
    /**
     * Instance Lenis tunggal yang dipasang oleh RootLayout untuk smooth scroll.
     * Disimpan di properti terpisah `__lenis` (bukan `window.lenis`) karena paket
     * `lenis` sudah memakai `window.lenis` untuk flag devtools-nya sendiri.
     * Diketik struktural (hanya method yang dipakai) agar tidak terikat versi paket.
     */
    __lenis?: {
      scrollTo: (
        target: string | number | HTMLElement,
        options?: { offset?: number; duration?: number },
      ) => void;
      start: () => void;
      stop: () => void;
      destroy: () => void;
    };
  }
}
