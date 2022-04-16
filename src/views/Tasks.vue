<template>
    <div class="page">
<!--        <b-breadcrumb :items="breadCrumb()" class="top-bar"></b-breadcrumb>-->
        <b-breadcrumb class="top-bar">
            <b-breadcrumb-item
                v-for="i in breadCrumb()"
                :href="i.href || '#'"
                :active="i.active || false"
                @click="i.click($event)"
            >{{i.text}}</b-breadcrumb-item>
        </b-breadcrumb>

        <b-alert variant="warning" :show="loading">
           <b-icon icon="hourglass-top" animation="spin"></b-icon> {{$t("app.loading")}}
        </b-alert>

        <div v-if="!loading">

            <!-- Tasks list -->
            <div class="tasks-list" v-if="!isTaskOpened">
                <div
                    class="category"
                    v-for="(category, category_index) in categories"
                >
                    <h3>{{category.name}}</h3>

                    <b-card v-for="(unit, unit_index) in category.units" no-body :header="$t('tasks.unit', {name: unit.name})" class="mb-4">
<!--                        <b-card-body>-->
<!--                            <b>{{$t('tasks.unitDescription')}}</b><br>-->
<!--                            {{unit.description}}-->
<!--                        </b-card-body>-->

                        <b-list-group flush>
                            <b-list-group-item
                                    :variant="task.completed ? 'success' : ''"
                                    v-for="(task, task_index) in unit.tasks"
                                    :href="taskUrl(category_index, unit_index, task_index)"
                                    @click="onTaskClicked($event, category_index, unit_index, task_index)"
                            >
<!--                                {{$t('tasks.task', {name: task.title})}}-->
                                {{task.title}}
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>

                </div>
            </div>
            <Task
                v-else
                :client="client"
                :languages="languages"
                :task="categories[categoryID].units[unitID].tasks[taskID]"
            />

        </div>
    </div>
</template>

<script lang="ts">
    import TaskPage from '@/components/Task.vue';
    import Vue from 'vue';
    import {$t} from '@/lang';
    import router from '@/router';
    import {Client} from "@/ts/class/api/Client";
    import Category from "@/ts/class/Category";
    import Task from "@/ts/class/Task";
    import Unit from "@/ts/class/Unit";
    import CategoryParser from "@/ts/class/parser/CategoryParser";

    export default Vue.extend({
        name: "Tasks",

        props: {
            client: Client
        },

        components: {
            Task: TaskPage
        },

        data: () => ({
            $t: $t,
            categories: [] as Array<Category>,
            isTaskOpened: false,

            languages: [] as Array<string>,

            categoryID: 0,
            unitID: 0,
            taskID: 0,

            router: router,

            loading: true,
            error: ""
        }),

        mounted(){
            if(!this.client.sessionIsStarted()){
                this.router.push("/login?unknownToken=true");
                return;
            }

            this.loadCategories();
            this.getLanguages();
        },
        methods: {
            loadCategories(){
                const apiCall = this.client.tasksHierarchy(this.client.token);

                this.loading = true;
                apiCall.onError = () => {
                    this.loading = false;
                };
                apiCall.onSuccess = (categories: any) => {
                    this.categories = [];
                    for(let i in categories)
                        this.categories.push((new CategoryParser()).parse(categories[i]));

                    this.loading = false;
                    this.openTask();
                };
            },

            openTask(cat?: number, unit?: number, task?: number) {

                let cat_id:  number = (cat !== undefined)  ? cat  : parseInt(router.currentRoute.params.cat_id,  10);
                let unit_id: number = (unit !== undefined) ? unit : parseInt(router.currentRoute.params.unit_id,  10);
                let task_id: number = (task !== undefined) ? task : parseInt(router.currentRoute.params.task_id, 10);

                // If something is broken or unloaded
                if(
                    isNaN(cat_id) ||
                    isNaN(task_id) ||
                    isNaN(unit_id) ||
                    this.categories[cat_id] == undefined ||
                    this.categories[cat_id].units[unit_id] == undefined ||
                    this.categories[cat_id].units[unit_id].tasks[task_id] == undefined
                ){
                    this.isTaskOpened = false;
                    return;
                }

                this.categoryID = cat_id;
                this.unitID = unit_id;
                this.taskID = task_id;

                this.isTaskOpened = true;

                this.$forceUpdate();
            },

            closeTask(){
                this.categoryID = 0;
                this.unitID = 0;
                this.taskID = 0;

                this.isTaskOpened = false;

                if(window.location.pathname !== "/tasks/") {
                    // Push() forces full reload
                    router.replace("/tasks/");
                }
            },

            breadCrumb(): Array<any> {
                type BarType = {
                    active?: boolean,
                    text: string,
                    href?: string,
                    click (e: Event): void
                };

                let bar = [] as Array<BarType>;

                bar.push({
                    text: $t('tasks.title').toString(),
                    click: () => {
                        this.closeTask();
                    }
                });

                if(this.isTaskOpened){
                    bar.push({
                        text: this.categories[this.categoryID].name,
                        click: () => {},
                        active: true
                    });
                    bar.push({
                        text: this.categories[this.categoryID].units[this.unitID].name,
                        click: () => {},
                        active: true
                    });
                    bar.push({
                        text: this.categories[this.categoryID].units[this.unitID].tasks[this.taskID].title,
                        click: () => {},
                        active: true
                    });
                }

                bar[bar.length - 1].active = true;
                return bar;
            },

            onTaskClicked(e: Event, category_index: number, unit_index: number, task_index: number){
                e.preventDefault();

                this.openTask(category_index, unit_index, task_index);

                const link = this.taskUrl(category_index, unit_index, task_index);
                if(window.location.pathname !== link) {
                    // Push() forces full reload
                    router.replace(link);
                }
            },

            taskUrl(category_id: number, unit_id: number, task_id: number){
                return "/tasks/" + [category_id, unit_id, task_id].join("/") + "/";
            },

            getLanguages(){
                const apiCall = this.client.languages();
                apiCall.onSuccess = (data: any) => {
                    this.languages = (data.langs !== undefined) ? data.langs : [];
                };
            }
        }
    })
</script>

<style scoped>

</style>