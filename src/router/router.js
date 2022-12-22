import { Main, Favorite, Film, NotFound } from '@/components/pages';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/favorite',
        component: Favorite
    },
    {
        path: '/film/:id',
        component: Film
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;