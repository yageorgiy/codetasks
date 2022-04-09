<template>
    <div class="page">
        <b-media>
            <template #aside>
                <b-avatar icon="person-fill" size="4em"></b-avatar>
            </template>
            <h5 class="mt-0 mb-1">@username</h5>
            <p class="mb-0">
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group
                            :label="$t('profile.name')"
                            label-for="name"
                    >
                        <b-form-input
                                id="name"
                                disabled
                                v-model="form.name"
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
                                v-model="form.email"
                                type="email"
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
    import {Client} from "@/ts/class/api/Client";
    import { ProfileForm } from '@/ts/types';
    import {$t} from "@/lang";

    export default {
        name: "Profile",
        props: {
            client: Client
        },
        data: () => ({
            form: {
                // firstName: "Name",
                // lastName: "Surname",
                // middleInitial: "Middlename",
                name: "Name Surname Middlename",
                email: "user@example.com",
            } as ProfileForm,
            $t: $t
        }),
        methods: {
            onSubmit: function(){

            },
            onReset: function(){

            }
        }
    }
</script>

<style scoped>

</style>