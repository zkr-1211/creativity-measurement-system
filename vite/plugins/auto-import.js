import autoImport from "unplugin-auto-import/vite";
export default function createAutoImport() {
  return autoImport({
    imports: ["vue", "vue-router", "@vueuse/core"],
    eslintrc: {
      enabled: false,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true,
    },
    dts: "src/auto-import.d.ts",
  });
}
