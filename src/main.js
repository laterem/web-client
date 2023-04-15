import { createApp } from "vue";
import App from "./App.vue";
import HeaderApp from "./HeaderApp.vue";
// import NavTreeApp from "./App.vue";
import router from "./router";
import VueSession from "./vue-session";
import store from "./store";

createApp(App).use(store).use(VueSession).use(router).mount("#app");
createApp(HeaderApp).use(store).use(VueSession).use(router).mount("#header");
