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
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown id="dropdown-form-button" ref="dropdown" right>
                        <template #button-content>
                            <b-avatar icon="person-fill" size="2em"></b-avatar> {{$t('app.widget.login.title')}}
                        </template>
                        <b-dropdown-form id="dropdown-form">
                            <b-form-group :label="$t('app.widget.login.email')" label-for="dropdown-form-email" @submit.stop.prevent>
                                <b-form-input
                                        id="dropdown-form-email"
                                        size="sm"
                                        :placeholder="$t('app.widget.login.placeholders.email')"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group :label="$t('app.widget.login.password')" label-for="dropdown-form-password">
                                <b-form-input
                                        id="dropdown-form-password"
                                        type="password"
                                        size="sm"
                                        :placeholder="$t('app.widget.login.placeholders.password')"
                                ></b-form-input>
                            </b-form-group>

<!--                            <b-form-checkbox class="mb-3">{{$t('app.widget.login.rememberMe')}}</b-form-checkbox>-->
                            <b-button variant="primary" size="sm" @click="onSignIn">{{$t('app.widget.login.signIn')}}</b-button>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item to="/lost-password">{{$t('app.widget.login.forgotPassword')}}</b-dropdown-item>
                        <b-dropdown-item to="/register">{{$t('app.widget.login.signUp')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
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
    import {$t} from '@/lang';
    import router from '@/router';
    import {URL} from '@/ts/types';
    import Store from "@/store";
    import { Client } from './ts/class/api/Client';

    export default {
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
            title: process.env.VUE_APP_TITLE,
            copyright: process.env.VUE_APP_COPYRIGHT,

            client: new Client(process.env.VUE_APP_API_MOUNT)
        }),

        methods: {
            onLinkClicked(e: Event, link: URL){
                e.preventDefault();
                if(window.location.pathname !== link.url)
                    router.push(link.url);
            },

            onSignIn(){

            }
        }
    }
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