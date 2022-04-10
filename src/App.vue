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
                        v-for="link in links"
                        @click="onLinkClicked($event, link)"
                        :href="link.url"
                        :class="$route.path === link.url ? 'nav-bar-item-selected' : ''"
                        :aria-selected="$route.path === link.toString()"
                    >{{link.title}}</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav v-if="!client.sessionIsStarted()" class="ml-auto">
                    <b-nav-item-dropdown id="dropdown-form-button" ref="dropdown" right @hide="onHide">
                        <template #button-content>
                            <b-avatar icon="person-fill" size="2em"></b-avatar> {{$t('app.widget.login.title')}}
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
                    <b-nav-item href="#" disabled>{{client.fullName === "" ? $t("app.loading") : client.fullName}}</b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

        <router-view
            :client="client"></router-view>

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
            links: [
                {
                    title: $t('home.title'),
                    url: "/"
                },
                {
                    title: $t('profile.title'),
                    url: "/profile/"
                },
                {
                    title: $t('tasks.title'),
                    url: "/tasks/"
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

            __canClose: true
        }),

        mounted(){
            if(localStorage.token)
            {
                this.client.sessionAuthorizeVerified(localStorage.token, () => {
                    router.push({
                        path: "/login?unknownToken=true"
                    });
                });
            }
        },

        methods: {
            onLinkClicked(e: Event, link: URL){
                e.preventDefault();
                if(window.location.pathname !== link.url)
                    router.push(link.url);
            },

            onSignIn(e: Event){
                // e.preventDefault();

                this.__canClose = false;

                this.apiCall = this.client.login(this.form.email, this.form.password);

                this.apiCall.onSuccess = (data: any) => {
                    _this.client.sessionAuthorize(data.token);
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