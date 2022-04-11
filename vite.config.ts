import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import styleImport from "vite-plugin-style-import";
import { visualizer } from "rollup-plugin-visualizer";
// eslint-disable-next-line import/no-unresolved
import Components from "unplugin-vue-components/vite";
// eslint-disable-next-line import/no-unresolved
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import generateModifyVars from "./build/style/generateModifyVars";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true,
    }),
    styleImport({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
});
