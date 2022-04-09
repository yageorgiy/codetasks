<template>
    <div class="page">

        <b-jumbotron
            header-level="1"
            :header='$t("errorPages.e404.title")'
            :lead='$t("errorPages.e404.subtitle")'>
            <b-link to="/">{{$t("errorPages.e404.goHome")}}</b-link>
        </b-jumbotron>

    </div>
</template>

<script lang="ts">
    import {$t} from "@/lang";
    import router from "@/router";

    export default {
        name: "Error404",
        data: () => ({
            $t: $t
        }),
        methods: {
            goHome(){
                router.push("/");
            }
        }
    }
</script>

<style scoped>
    .title{

    }
</style>