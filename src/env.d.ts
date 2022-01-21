// / <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  env: Record<string, unknown>
}
