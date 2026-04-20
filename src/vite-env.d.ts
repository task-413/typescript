/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCKS: string
  readonly VITE_OPENWEATHER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}