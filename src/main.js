import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
import Navigation from "./components/layout/Navigation.vue"
import Footer  from "./components/layout/Footer.vue";
import './index.css'
import 'tw-elements';

const  app = createApp(App); 
const path = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3001' : window.location.origin
app.config.globalProperties.$perpage = 12;
app.config.globalProperties.$serverURL = 'https://etto-recipe-app.herokuapp.com'
app.config.globalProperties.$baseUrl = path;
app.config.globalProperties.$defaultAvatar = `${path}/img/avatar/avatar.png`
app.config.globalProperties.$defaultRecipeImage = `${path}/img/recipes/default.jpg`

app
.component('Navigation', Navigation)
.component('Footer', Footer)
.use(router)
.use(store)
.mount('#app')


export default {
    app
}

