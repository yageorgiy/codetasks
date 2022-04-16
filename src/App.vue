<template>
    <div id="app">
        <b-navbar id="nav_bar" toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">
                <!-- :src="require('@/../public/favicon.png')" is base64 -->
                <b-img
                    src="/favicon.png"
                    class="d-inline-block align-top logo"
                    rounded="circle"
                    alt="logo"
                />
                {{title}}
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        v-for="link in (client.sessionIsStarted() ? links : linksUnauthorized)"
                        @click="onLinkClicked($event, link)"
                        :href="link.url"
                        :class="link.check($router.path) ? 'nav-bar-item-selected' : ''"
                        :aria-selected="link.check($router.path)"
                    >{{link.title}}</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav v-if="!client.sessionIsStarted()" class="ml-auto">
                    <b-nav-item-dropdown id="dropdown-form-button" ref="dropdown" right @hide="onHide">
                        <template #button-content>
                            <b-avatar icon="person" size="2em"></b-avatar> {{$t('app.widget.login.title')}}
                        </template>
                        <b-dropdown-form id="dropdown-form" @submit.stop.prevent>
                            <b-form-group :label="$t('app.widget.login.email')" label-for="dropdown-form-email">
                                <b-form-input
                                        id="dropdown-form-email"
                                        size="sm"
                                        type="email"
                                        v-model="form.email"
                                        :placeholder="$t('app.widget.login.placeholders.email')"
                                        v-if="!apiCall.isBusy"
                                ></b-form-input>
                                <b-skeleton
                                        v-else
                                        type="input"
                                ></b-skeleton>
                            </b-form-group>

                            <b-form-group :label="$t('app.widget.login.password')" label-for="dropdown-form-password">
                                <b-form-input
                                        id="dropdown-form-password"
                                        type="password"
                                        v-model="form.password"
                                        size="sm"
                                        :placeholder="$t('app.widget.login.placeholders.password')"
                                        v-if="!apiCall.isBusy"
                                ></b-form-input>
                                <b-skeleton
                                        v-else
                                        type="input"
                                ></b-skeleton>
                            </b-form-group>

<!--                            <b-form-checkbox class="mb-3">{{$t('app.widget.login.rememberMe')}}</b-form-checkbox>-->

                            <label class="text-danger d-block" v-if="!apiCall.isBusy && apiCall.error !== ''">{{apiCall.error}}</label>

                            <b-button
                                    v-if="!apiCall.isBusy"
                                    variant="primary"
                                    size="sm"
                                    @click="onSignIn($event)"
                            >{{$t('app.widget.login.signIn')}}</b-button>
                            <b-skeleton v-else type="button"></b-skeleton>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item to="/lost-password">{{$t('app.widget.login.forgotPassword')}}</b-dropdown-item>
                        <b-dropdown-item to="/register">{{$t('app.widget.login.signUp')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav v-else class="ml-auto">
                    <b-nav-item-dropdown id="dropdown-form-button" ref="dropdown" right>
                        <template #button-content>
                            <b-avatar icon="person-fill" size="2em"></b-avatar> {{client.fullName === "" ? $t("app.loading") : client.fullName}}
                        </template>
                        <b-dropdown-item @click="logout()">{{$t('app.widget.logout')}}</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <router-view
            :client="client"
            :router="router"
        ></router-view>


        <footer class="pb-2">
            <hr>
            {{copyright}}
        </footer>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {$t} from '@/lang';
    import router from '@/router';
    import {URL, LoginForm} from '@/ts/types';
    import Store from "@/store";
    import { Client } from './ts/class/api/Client';
    import { ApiCall } from './ts/class/api/ApiCall';
    import {BNavItemDropdown} from "bootstrap-vue";
    import {Dictionary} from "vue-router/types/router";

    export default Vue.extend({
        name: 'Home',

        data: () => ({
            $t: $t,

            /* For authorized users */
            links: [
                {
                    title: $t('home.title'),
                    url: "/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.home');
                    }
                },
                {
                    title: $t('profile.title'),
                    url: "/profile/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.profile');
                    }
                },
                {
                    title: $t('tasks.title'),
                    url: "/tasks/",
                    check(url: string){
                        // TODO: refactor
                        return router.currentRoute.matched.some(({ name }) => name === 'page.tasks') || /\/tasks\/(.+)\//i.test(router.currentRoute.path);
                    }
                },
                {
                    title: $t('leaderboard.title'),
                    url: "/leaderboard/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.leaderboard');
                    }
                }
            ] as Array<URL>,

            /* For anonymous users */
            linksUnauthorized: [
                {
                    title: $t('home.title'),
                    url: "/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.home');
                    }
                },
                {
                    title: $t('login.title'),
                    url: "/login/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.login');
                    }
                },
                {
                    title: $t('register.title'),
                    url: "/register/",
                    check(url: string){
                        return router.currentRoute.matched.some(({ name }) => name === 'page.register');
                    }
                }
            ] as Array<URL>,

            form: {
                email: "",
                password: ""
            } as LoginForm,
            title: process.env.VUE_APP_TITLE,
            copyright: process.env.VUE_APP_COPYRIGHT,
            apiCall: new ApiCall(null) as ApiCall,

            client: new Client(process.env.VUE_APP_API_MOUNT),

            router: router,

            __canClose: true
        }),

        mounted(){
            document.title = process.env.VUE_APP_TITLE;

            if(localStorage.token)
            {
                this.client.sessionAuthorize(localStorage.token);
            }
        },

        methods: {
            onLinkClicked(e: Event, link: URL){
                e.preventDefault();
                if(!link.check(router.currentRoute.toString()))
                    this.router.push(link.url);
            },

            onSignIn(e: Event){
                // e.preventDefault();

                this.__canClose = false;

                this.apiCall = this.client.login(this.form.email, this.form.password);

                this.apiCall.onSuccess = (data: any) => {
                    _this.client.sessionAuthorize(data.token);

                    _this.form.email = "";
                    _this.form.password = "";

                    if(window.location.pathname !== "/tasks")
                        _this.router.push("/tasks");
                };

                const _this = this;
                this.apiCall.onError = () => {
                    (_this.$refs.dropdown as BNavItemDropdown)?.show();
                };
            },
            onHide(bvEvent: Event) {
                if(!this.__canClose){
                    this.__canClose = true;
                    bvEvent.preventDefault();
                }
            },

            logout(){
                this.client.sessionLogout();
                (this.$refs.dropdown as BNavItemDropdown)?.hide();
                if(window.location.pathname !== "/login")
                    this.router.push("/login");
            }
        }
    })
</script>

<style>
    #app {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    footer {
        text-align: center;
    }

    #nav_bar {
        /*padding: 30px;*/
        position: sticky;
        top: 0;
        left: 0;
        z-index: 100;
    }

    #nav a {
        /*font-weight: bold;*/
        /*color: #2c3e50;*/
    }

    #nav a.router-link-exact-active {
        /*color: #42b983;*/
    }

    #dropdown-form{
        min-width: 300px;
    }

    .nav-bar-item-selected > a {
        color: var(--warning) !important;
    }

    .logo {
        width: 32px;
        height: 32px;
    }
</style>