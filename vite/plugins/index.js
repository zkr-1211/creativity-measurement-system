import vue from "@vitejs/plugin-vue";
import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import createStyleImport from "./style-import";
import createComponents from "./components";
import createMockServe from "./mock-serve";
export default function createVitePlugins(viteEnv, isBuild = false, command) {
  const vitePlugins = [vue()];
  vitePlugins.push(createComponents());
  vitePlugins.push(createStyleImport());
  vitePlugins.push(createMockServe(command));
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
