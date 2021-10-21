/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { createStore } from "vuex";
import getters from "./getters"

const moduleFiles = import.meta.globEager("./modules/*.ts");

const getModules = () => {
  const module: any = {};
  for (const path in moduleFiles) {
    const moduleName = path
      .replace(/^\.\/(.*)\.\w+$/, "$1")
      .replace("modules/", "");
    module[moduleName] = moduleFiles[path].default;
  }
  return module;
};

const modules = getModules();

const store = createStore({
  getters,
  modules,
});

export default store;
