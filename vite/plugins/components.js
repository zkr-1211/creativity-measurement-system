import Components from "unplugin-vue-components/vite";

export default function createComponents() {
  return Components({
    dirs: ["src/components"],
    extensions: ["vue", "tsx"],
    // 配置文件生成位置
    dts: "src/components.d.ts",
  });
}
