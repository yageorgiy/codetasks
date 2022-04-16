<template>
    <div class="page">

        <h3>{{$t('restorePassword.form.title')}}</h3>

        <b-alert :show="apiCall.error !== '' && !apiCall.isBusy" variant="danger" id="errorMessage">
            {{apiCall.error}}
        </b-alert>

        <b-form @submit="onSubmit" v-if="!done">
            <b-form-group
                    id="email-input-group"
                    :label="$t('restorePassword.form.email.label')"
                    label-for="email-input"
            >
                <b-form-input
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        :placeholder="$t('restorePassword.form.email.placeholder')"
                        required

                        v-if="!apiCall.isBusy"
                ></b-form-input>
                <b-skeleton type="input" v-else></b-skeleton>
            </b-form-group>

            <b-form-group
                    id="password-input-group"
                    :label="$t('restorePassword.form.password.label')"
                    :description="$t('restorePassword.form.password.description')"
                    label-for="password-input"
            >
                <b-form-input
                        id="password-input"
                        v-model="form.password"
                        :placeholder="$t('restorePassword.form.password.placeholder')"
                        type="password"
                        required

                        v-if="!apiCall.isBusy"
                ></b-form-input>
                <b-skeleton type="input" v-else></b-skeleton>
            </b-form-group>

            <b-button type="submit" variant="primary" v-if="!apiCall.isBusy">{{$t('restorePassword.form.submit')}}</b-button>
            <b-skeleton type="button" v-else></b-skeleton>
        </b-form>

        <b-alert :show="done" variant="success" id="successMessage">
            {{$t("restorePassword.succeeded")}}
        </b-alert>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Client} from "../ts/class/api/Client";
    import {ApiCall} from "@/ts/class/api/ApiCall";
    import {RestorePasswordForm} from "@/ts/types";

    export default Vue.extend({
        name: "ForgetPassword",
        props: {
            client: Client,
        },
        data: () => ({
            apiCall: new ApiCall(null) as ApiCall,
            form: {
                email: "",
                password: ""
            } as RestorePasswordForm,
            done: false
        }),
        methods: {
            onSubmit(e: Event){
                e.preventDefault();

                const _this = this;
                this.apiCall = this.client.restore(this.form.email, this.form.password);
                this.apiCall.onSuccess = (data: any) => {
                    _this.done = true;
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