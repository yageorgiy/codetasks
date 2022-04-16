<template>
    <div class="page">

        <h3>{{$t('register.form.title')}}</h3>

        <b-alert :show="apiCall.error !== '' && !apiCall.isBusy" variant="danger" id="errorMessage">
            {{apiCall.error}}
        </b-alert>

        <b-form @submit="onSubmit" v-if="!done">
            <b-form-group
                    id="email-input-group"
                    :label="$t('register.form.email.label')"
                    label-for="email-input"
            >
                <b-form-input
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        :placeholder="$t('register.form.email.placeholder')"
                        required

                        v-if="!apiCall.isBusy"
                ></b-form-input>
                <b-skeleton type="input" v-else></b-skeleton>
            </b-form-group>

            <b-form-group
                    id="name-input-group"
                    :label="$t('register.form.name.label')"
                    label-for="name-input"
            >
                <b-form-input
                        id="name-input"
                        v-model="form.name"
                        :placeholder="$t('register.form.name.placeholder')"
                        required

                        v-if="!apiCall.isBusy"
                ></b-form-input>
                <b-skeleton type="input" v-else></b-skeleton>
            </b-form-group>

            <b-form-group
                    id="password-input-group"
                    :label="$t('register.form.password.label')"
                    :description="$t('register.form.password.description')"
                    label-for="password-input"
            >
                <b-form-input
                        id="password-input"
                        v-model="form.password"
                        :placeholder="$t('register.form.password.placeholder')"
                        type="password"
                        required

                        v-if="!apiCall.isBusy"
                ></b-form-input>
                <b-skeleton type="input" v-else></b-skeleton>
            </b-form-group>

            <b-button type="submit" variant="primary" v-if="!apiCall.isBusy">{{$t('register.form.submit')}}</b-button>
            <b-skeleton type="button" v-else></b-skeleton>
        </b-form>

        <b-alert :show="done" variant="success" id="successMessage">
            {{$t("register.succeeded")}}
        </b-alert>

    </div>
</template>

<script lang="ts">
    import {RegisterForm} from "@/ts/types";
    import { $t } from '@/lang';
    import {Client} from "@/ts/class/api/Client";
    import router from '@/router';
    import Vue from 'vue';
    import {ApiCall} from "@/ts/class/api/ApiCall";

    export default Vue.extend({
        name: "Register",
        props: {
            client: Client
        },
        data: () => ({
            form: {
                name: "",
                email: "",
                password: ""
            } as RegisterForm,
            apiCall: new ApiCall(null) as ApiCall,

            $t: $t,
            router: router,
            done: false
        }),

        methods: {
            onSubmit(e: Event){
                e.preventDefault();

                const _this = this;
                this.apiCall = this.client.register(this.form.name, this.form.email, this.form.password);
                this.apiCall.onSuccess = (data: any) => {
                    _this.done = true;
                    // _this.client.sessionAuthorize(data.token);
                    // router.push("/");
                };
                this.apiCall.onError = () => {
                    _this.$nextTick(() => { this.$scrollTo("#errorMessage"); });
                };
            }
        }
    })
</script>

<style scoped>

</style>