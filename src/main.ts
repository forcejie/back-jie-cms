import { createApp } from "vue"
import App from "./App.vue"
import "normalize.css"
import "./assets/css/index.less"
import router from "./router"
import store from "./store"
import registerIcons from "./global/register-icons"

// 0.针对ElMessage和ElLoading等组件引入样式
// 1.全局引入样式(所有样式全部引入)
// import "element-plus/dist/index.css"
const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(store)
app.mount("#app")
