import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  // 增加环境变量
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build", command),
    resolve: {
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: "https://dev.shuke.biteyuan.net",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `$injectedColor: orange;`,
        },
        less: {
          modifyVars: {
            // 更改主题在这里
            // 'primary-color': '#52c41a',
            // 'link-color': '#1DA57A',
            // 'border-radius-base': '2px'
          },
          javascriptEnabled: true,
        },
      },
    },
    // 引入第三方的配置,强制预构建插件包
    optimizeDeps: {
      include: ["echarts", "axios"],
    },
    build: {
      target: "modules", // 指定es版本,浏览器的兼容性
      outDir: "dist", // 指定打包输出路径
      assetsDir: "assets", // 指定静态资源存放路径
      cssCodeSplit: true, // css代码拆分,禁用则所有样式保存在一个css里面
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      sourcemap: false, // 是否构建source map 文件
      minify: "terser", // 混淆器，terser构建后文件体积更小
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      terserOptions: {
        compress: {
          // eslint-disable-next-line camelcase
          drop_console: true, // 生产环境移除console
          // eslint-disable-next-line camelcase
          drop_debugger: true, // 生产环境移除drop_debugger
        },
      },
      // 将 js 和 css 文件夹分离
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
