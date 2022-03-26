<template>
    <div class="page">
<!--        <b-card-group columns deck>-->
        <b-breadcrumb :items="[
            {
                text: $t('tasks.title')
            }
        ]" class="top-bar"></b-breadcrumb>

        <b-card v-for="(i, index) in categories" no-body :header="$t('tasks.category', {name: i.name})" class="mb-4">
            <b-card-body>
                <b>{{$t('tasks.categoryDescription')}}</b><br>
                {{i.description}}
            </b-card-body>

            <b-list-group flush>
                <b-list-group-item
                    v-for="(task, taskIndex) in i.tasks" :href="'/tasks/' + index + '/' + taskIndex + '/'"
                    @click="onTaskClicked($event, '/tasks/' + index + '/' + taskIndex + '/')"
                >{{$t('tasks.task', {name: task.title})}}</b-list-group-item>
            </b-list-group>
        </b-card>
<!--        </b-card-group>-->
    </div>
</template>

<script lang="ts">
    import {$t} from '@/lang';
    import Store from "@/store";
    import router from '@/router';

    export default {
        name: "Tasks",
        data(){
            // Store.commit('increment');
            // console.log(Store.state.test);

            return {
                $t: $t,
                categories: Store.state.categories
            }
        },
        methods: {
            onTaskClicked(e: Event, link: string){
                e.preventDefault();
                if(window.location.pathname !== link)
                    router.push(link);
            }
        }
    }
</script>

<style scoped>

</style>