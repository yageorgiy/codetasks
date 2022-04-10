<template>
    <div class="page">
        <b-alert :show="apiCall.error !== '' && !apiCall.isBusy" variant="danger" id="errorMessage">
            {{apiCall.error}}
        </b-alert>

        <b-alert :show="router.currentRoute.query.unknownToken === 'true'" variant="warning" id="warningMessage">
            {{$t("app.errors.reloginError")}}
        </b-alert>

        <b-form @submit="onSubmit">
            <b-form-group
                    id="email-input-group"
                    :label="$t('login.form.email.label')"
                    label-for="email-input"
            >
                <b-form-input
                        v-if="!apiCall.isBusy"
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        :placeholder="$t('login.form.email.placeholder')"
                        required
                ></b-form-input>
                <b-skeleton
                        v-else
                        type="input"
                ></b-skeleton>
            </b-form-group>

            <b-form-group
                    id="password-input-group"
                    :label="$t('login.form.password.label')"
                    label-for="password-input"
            >
                <b-form-input
                        v-if="!apiCall.isBusy"
                        id="password-input"
                        v-model="form.password"
                        type="password"
                        :placeholder="$t('login.form.password.placeholder')"
                        required
                ></b-form-input>
                <b-skeleton
                        v-else
                        type="input"
                ></b-skeleton>
            </b-form-group>

            <b-button v-if="!apiCall.isBusy" type="submit" variant="primary">{{$t('login.form.submit')}}</b-button>
            <b-skeleton v-else type="button"></b-skeleton>
        </b-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {LoginForm} from "@/ts/types";
    import {$t} from "@/lang";
    import {Client} from "@/ts/class/api/Client";
    import router from '@/router';
    import {ApiCall} from "@/ts/class/api/ApiCall";

    export default Vue.extend({
        name: "Login",
        props: {
            client: Client
        },
        data: () => ({
            form: {
                email: "",
                password: ""
            } as LoginForm,
            apiCall: new ApiCall(null) as ApiCall,
            router: router,
            $t: $t
        }),
        methods: {
            onSubmit(e: Event){
                e.preventDefault();
                const _this = this;

                this.apiCall = this.client.login(this.form.email, this.form.password);
                this.apiCall.onSuccess = (data: any) => {
                    router.push("/");
                    _this.client.sessionAuthorize(data.token);
                };
                this.apiCall.onError = () => {
                    _this.$nextTick(() => { this.$scrollTo("#errorMessage"); });
                };
            }
        }
    });
</script>

<style scoped>

</style>