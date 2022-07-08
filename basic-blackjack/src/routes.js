import RandomModeView from '@/views/RandomModeView.vue';
import SoftModeView from '@/views/SoftModeView.vue';
import SplitModeView from '@/views/SplitModeView.vue';

export default [
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
    }
]