import { viteMockServe } from "vite-plugin-mock";
export default function createMockServe(command) {
  let prodMock = true;
  return viteMockServe({
    mockPath: "mock",
    localEnabled: command === "serve",
    prodEnabled: command !== "serve" && prodMock,
    injectCode: `
      import { setupProdMockServer } from '../src/mockProdServer';
      setupProdMockServer();
    `,
  });
}
