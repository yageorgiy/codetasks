import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: "page.home",
        component: Home
    },
    {
        path: '/profile',
        name: "page.profile",
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    },
    {
        path: '/tasks',
        name: "page.tasks",
        component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue')
    },
    {
        path: '/tasks/:cat_id/:task_id',
        name: "page.task",
        component: () => import(/* webpackChunkName: "task" */ '../views/Task.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;