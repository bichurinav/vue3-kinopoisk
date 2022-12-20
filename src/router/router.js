import { Main, Favorite, Film } from '@/components/pages';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
        props: true,
    },
    {
        path: '/favorite',
        component: Favorite
    },
    {
        path: '/film/:id',
        component: Film
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;