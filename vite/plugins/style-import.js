import styleImport from 'vite-plugin-style-import'

export default function createStyleImport() {
  return styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        }
      }
    ]
  })
}
