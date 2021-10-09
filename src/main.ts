import { createApp } from "vue";
import App from "./App.vue";
// eslint-disable-next-line import/no-unresolved
import "virtual:windi.css";
import router from "./router";
import { setupHttp } from "./lib/http";

setupHttp();
createApp(App).use(router).mount("#app");
