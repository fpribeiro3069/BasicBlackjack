import { createWebHistory, createRouter } from "vue-router";

import RandomModeView from '@/views/RandomModeView.vue';
import SoftModeView from '@/views/SoftModeView.vue';
import SplitModeView from '@/views/SplitModeView.vue';

const routes = [
    {
        name: 'random',
        path: "/",
        component: RandomModeView,
    },
    {
        name: 'soft',
        path: '/soft',
        component: SoftModeView,
    },
    {
        name: 'split',
        path: '/split',
        component: SplitModeView,
    },
    {
        path: '/:catchAll(.*)',
        redirect: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;