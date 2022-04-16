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
        path: '/tasks/:cat_id/:unit_id/:task_id/',
        name: "page.task",
        component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue')
    },
    {
        path: '/login',
        name: "page.login",
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: "page.register",
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/leaderboard',
        name: "page.leaderboard",
        component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue')
    },
    {
        path: '/lost-password',
        name: "page.restorePassword",
        component: () => import(/* webpackChunkName: "restorePassword" */ '../views/RestorePassword.vue')
    },
    {
        path: '/404',
        name: 'page.e404',
        component: () => import(/* webpackChunkName: "error404" */ '../views/errors/Error404.vue'),
    }, {
        path: '*',
        redirect: '/404'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;