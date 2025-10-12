// src/types/pdfjs.d.ts
declare module "pdfjs-dist/legacy/build/pdf" {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
  export function getDocument(
    src: string | Uint8Array | ArrayBuffer | { data: string | Uint8Array | ArrayBuffer }
  ): any;
}

declare module "pdfjs-dist/legacy/build/pdf.worker.entry" {
  const workerSrc: string;
  export default workerSrc;
}
