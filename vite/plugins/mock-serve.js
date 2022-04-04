import { viteMockServe } from 'vite-plugin-mock'

export default function createMockServe() {
  return viteMockServe({ supportTs: true })
}
