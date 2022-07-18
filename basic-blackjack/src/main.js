import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

import routes from './routes';
import { createWebHistory, createRouter } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes,
  })

const store = createStore({
    state() {
        // let agreedToPrivacy = localStorage.getItem('agreedToPrivacy');
        let totalCount = localStorage.getItem('totalCount');
        let totalCorrectCount = localStorage.getItem('totalCorrectCount');

        // if (!agreedToPrivacy) {
        //     // User has not agreed to privacy
        //     return {};
        // }

        if (!totalCount) {
            totalCount = 0;
        } else {
            totalCount = parseInt(totalCount);
            if (isNaN(totalCount)) {
                totalCount = 0;
                console.log("Please stop changing the values of your browser local storage.");
            }
        }

        if (!totalCorrectCount) {
            totalCorrectCount = 0;
        } else {
            totalCorrectCount = parseInt(totalCorrectCount);
            if (isNaN(totalCorrectCount)) {
                totalCorrectCount = 0;
                console.log("Please stop changing the values of your browser local storage.");
            }
        }

        return {
            totalCount, totalCorrectCount
        }
    },
    mutations: {
        // agreeToPrivacy(state) {
        //     localStorage.setItem('agreedToPrivacy', true);
        //     state.agreedToPrivacy = true;
        // },
        incrementTotalCount(state) {
            state.totalCount++;
            localStorage.setItem('totalCount', state.totalCount);
        },
        incrementTotalCorrectCount(state) {
            state.totalCorrectCount++;
            localStorage.setItem('totalCorrectCount', state.totalCorrectCount);
        },
        clearCounts(state) {
            state.totalCount = 0;
            state.totalCorrectCount = 0;
            localStorage.setItem('totalCorrectCount', 0);
            localStorage.setItem('totalCount', 0);
        }
    }
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
