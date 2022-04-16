<template>
    <div class="page">
        <!-- TODO: dedicated component -->
        <b-alert variant="warning" show v-if="apiCall.isBusy">
            <b-icon icon="hourglass-top" animation="spin"></b-icon> {{$t("app.loading")}}
        </b-alert>

        <b-table
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
        ></b-table>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {ApiCall} from "@/ts/class/api/ApiCall";
    import {Client} from "@/ts/class/api/Client";
    import {$t} from "@/lang";

    export default Vue.extend({
        name: "Leaderboard",
        props: {
            client: Client
        },
        data: () => ({
            apiCall: new ApiCall(null) as ApiCall,

            sortBy: "score",
            sortDesc: true,
            fields: [
                { key: 'name', label: $t("leaderboard.name"), sortable: false },
                { key: 'score', label: $t("leaderboard.score"), sortable: true },
            ],
            items: [] as Array<{name: string, score: number}>
        }),
        mounted() {
            this.getLeaderboard();
        },
        methods: {
            getLeaderboard(){
                this.apiCall = this.client.leaderboard(this.client.token);
                const _this = this;
                this.apiCall.onSuccess = (data: any) => {
                    _this.items = [];
                    for(let i in data){
                        const cur = data[i];
                        _this.items.push({
                            name: i,
                            score: cur
                        })
                    }
                };
            }
        }
    })
</script>

<style scoped>

</style>