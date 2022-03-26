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
                            :label="$t('profile.firstName')"
                            label-for="firstName"
                    >
                        <b-form-input
                                id="firstName"
                                disabled
                                v-model="form.firstName"
                                required
                        ></b-form-input>
                    </b-form-group>

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

    // TODO: move to dedicated folder (rebase structure)
    class Form {
        public firstName: string;
        public middleInitial: string;
        public lastName: string;
        public email: string;

        constructor(
            public _firstName: string,
            public _lastName: string,
            public _middleInitial: string,
            public _email: string
        ) {
            this.firstName = _firstName;
            this.lastName = _lastName;
            this.middleInitial = _middleInitial;
            this.email = _email;
        }
    }

    export default {
        name: "Profile",
        data(){
            return {
                form: new Form("Name", "Surname", "Midname", "sample@mail.com")
            }
        },
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