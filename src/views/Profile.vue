<template>
    <div class="page">
        <b-media>
            <template #aside>
                <b-avatar icon="person-fill" size="4em"></b-avatar>
            </template>
<!--            <h5 class="mt-0 mb-1">@username</h5>-->
            <p class="mb-0">
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group
                            :label="$t('profile.name')"
                            label-for="name"
                    >
                        <b-form-input
                                id="name"
                                disabled
                                :value="client.fullName || $t('app.loading')"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <!--
                    <b-form-group
                            :label="$t('profile.lastName')"
                            label-for="lastName"
                    >
                        <b-form-input
                                id="lastName"
                                disabled
                                v-model="form.lastName"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            :label="$t('profile.middleInitial')"
                            label-for="middleInitial"
                    >
                        <b-form-input
                                id="middleInitial"
                                disabled
                                v-model="form.middleInitial"
                                required
                        ></b-form-input>
                    </b-form-group>
                    -->
                    <b-form-group
                            :label="$t('profile.email')"
                            label-for="email"
                    >
                        <b-form-input
                                id="email"
                                disabled
                                type="email"
                                :value="client.email || $t('app.loading')"
                                required
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group
                            :label="$t('profile.score')"
                            label-for="name"
                    >
                        <b-form-input
                                id="name"
                                disabled
                                :value="client.score"
                                required
                        ></b-form-input>
                    </b-form-group>
<!--                    {{}}-->
<!--                    <b-button type="submit" variant="primary">Submit</b-button>-->
<!--                    <b-button type="reset" variant="danger">Reset</b-button>-->
                </b-form>
            </p>
        </b-media>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Client} from "@/ts/class/api/Client";
    import { ProfileForm } from '@/ts/types';
    import {$t} from "@/lang";
    import VueRouter from 'vue-router';

    export default Vue.extend({
        name: "Profile",
        props: {
            client: Client,
            router: VueRouter
        },
        data: () => ({
            $t: $t
        }),
        mounted(){
            if(!this.client.sessionIsStarted()){
                this.router.push("/login?unknownToken=true");
            }

            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
            // TODO: reload form
        },
        methods: {
            onSubmit: function(){

            },
            onReset: function(){

            }
        }
    })
</script>

<style scoped>

</style>