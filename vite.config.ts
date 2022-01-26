import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 需要安装的插件@types/node
// import ViteComponents, { AntDesignVueResolver } from "vite-plugin-components";
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression' // gzip必备插件
import { viteMockServe } from 'vite-plugin-mock'
// 1. defineConfig: 不用 jsdoc 注解也可以获取类型提示
// 2. 找不到模块“path”或其相应的类型声明 或者 找不到名称“__dirname 安装 @types/node
// const PUBLIC_PATH = '/'
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? PUBLIC_PATH : './',
  base: './',
  publicDir: 'public', // 公共文件路径,会被复制到outDir 根目录
  // 路径相关规则
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      },
      less: {
        modifyVars: {
          // 更改主题在这里
          // 'primary-color': '#52c41a',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  // 为服务器设置代理规则
  server: {
    host: '0.0.0.0', // 指定服务器主机名
    port: 3333, // 指定服务端口号
    open: false, // 运行自动打开浏览器
    // https: false, // 关闭https
    strictPort: true, // 若3333端口被占用,直接结束项目
    proxy: {
      // 选项写法
      // "/api": {
      //   target: "http://xxx.com",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    }
  },
  // 引入第三方的配置,强制预构建插件包
  optimizeDeps: {
    include: ['echarts', 'axios']
  },
  build: {
    target: 'modules', // 指定es版本,浏览器的兼容性
    outDir: 'dist', // 指定打包输出路径
    assetsDir: 'assets', // 指定静态资源存放路径
    cssCodeSplit: true, // css代码拆分,禁用则所有样式保存在一个css里面
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    sourcemap: false, // 是否构建source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    terserOptions: {
      compress: {
        // eslint-disable-next-line camelcase
        drop_console: true, // 生产环境移除console
        // eslint-disable-next-line camelcase
        drop_debugger: true // 生产环境移除drop_debugger
      }
    },
    // 将 js 和 css 文件夹分离
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    }),
    viteMockServe({ supportTs: true })
    // 以下方法有点卡
    // ViteComponents({
    //   // ts支持
    //   globalComponentsDeclaration: true,
    //   // 组件库导入处理按需加载
    //   customComponentResolvers: [AntDesignVueResolver()],
    // }),
  ]
})
