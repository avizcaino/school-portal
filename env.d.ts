/// <reference types="vite/client" />

declare const APP_VERSION_NUMBER: string;
declare const APP_VERSION_DATE: string;

interface ImportMetaEnv {
  VITE_BACK_END_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
