import { createApp } from 'vue'
import App from './App.vue'

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

import routes from './routes';
import { createWebHistory, createRouter } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes,
  })

createApp(App)
    .use(router)
    .mount('#app')
