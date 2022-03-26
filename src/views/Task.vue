<template>
    <div class="page">
        <b-breadcrumb :items="[
            {
                text: $t('tasks.title'),
                to: '/tasks/'
            },
            {
                text: category_name,
                active: true
            },
            {
                text: task_name,
                active: true
            }
        ]" class="top-bar"></b-breadcrumb>

        <h1>{{task_name}}</h1>

        <b-card no-body>
            <b-tabs card>
                <b-tab :title="$t('tasks.tabs.description')" active>
                    <b-card-text>
                        <p>{{description}}</p>

                        <h3>{{$t('tasks.input.title')}}</h3>
                        <b-card-group columns deck class="d-flex align-content-end input-cards">
                            <b-card
                                    class="input-card mb-4"
                                    v-for="input in inputs"
                                    :title="input.name"
                            >
                                <b-card-text>
                                    {{$t('tasks.input.instance.subtitle', {type: input.type})}}
                                    {{(input.dimensions[0] > 1) ? $t('tasks.input.instance.dimensions', {
                                    dimensions: input.dimensions.join("x")
                                    }) : ""}}
                                </b-card-text>
                            </b-card>
                        </b-card-group>

                        <h3>{{$t('tasks.output')}}</h3>
                        <p>{{output}}</p>
                    </b-card-text>
                </b-tab>
                <b-tab :title="$t('tasks.tabs.submits')">
                    <b-card-text>
                        TODO
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>

        <h3>{{$t('tasks.solution')}}</h3>
        <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>

        <b-navbar type="light" variant="light" class="mt-4 bottom-bar">
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-button variant="outline-primary" class="my-2 my-sm-0" onclick="submit" ref="submitButton">{{$t('tasks.submit')}}</b-button>
                </b-nav-form>
            </b-navbar-nav>
        </b-navbar>

    </div>
</template>

<script lang="ts">
    import {$t} from '@/lang';
    import Store from "@/store";
    import router from '@/router';

    // Prism JS highlight
    import { highlight, languages } from "prismjs/components/prism-core";
    import 'prismjs/components/prism-clike';
    import 'prismjs/components/prism-c';
    import 'prismjs/components/prism-cpp';
    import 'prismjs/components/prism-csharp';
    import 'prismjs/components/prism-java';
    import 'prismjs/components/prism-python';
    import 'prismjs/components/prism-javascript';

    import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

    import Vue from 'vue';
    import Input from '@/ts/class/Input';


    export default Vue.extend({
        name: "Task",

        data: () => {
            let _: Input[] = [];
            return {
                $t: $t,
                router: router,
                categories: Store.state.categories,

                category_name: "?",
                task_name: "?",
                description: "",

                language: "c",
                code: "",

                inputs: _,

                output: ""
            };
        },

        created() {
            let cat_id:  number = parseInt(router.currentRoute.params.cat_id,  10);
            let task_id: number = parseInt(router.currentRoute.params.task_id, 10);

            let categories = Store.state.categories;

            // If something is broken or unloaded
            if(
                isNaN(cat_id) ||
                isNaN(task_id) ||
                categories[cat_id] == undefined ||
                categories[cat_id].tasks[task_id] == undefined
            ){
                router.push("/tasks/");
                return false;
            }

            this.completeFields(cat_id, task_id);
        },

        methods: {

            completeFields(cat_id: number, task_id: number){
                let categories = Store.state.categories;

                let cat = categories[cat_id];
                let task = cat.tasks[task_id];

                this.category_name      = cat.name;
                this.task_name          = task.title;
                this.code               = task.sampleCode;
                this.language           = task.language;
                this.description        = task.description;
                this.inputs             = task.inputs;
                this.output             = task.output;
            },

            onTaskClicked(e: Event, link: string){
                e.preventDefault();
                if(window.location.pathname !== link)
                    router.push(link);
            },

            highlighter(code: string) {
                return highlight(code, languages[this.language]); // languages.<insert language> to return html with markup
            },

            submit(){

            }
        }
    });
</script>

<style scoped>
    .editor{
        background-color: #e9ecef;
    }

    .input-cards {
        /*overflow: auto;*/
        /*width: 600px !important;*/
    }

    .input-card {
        min-width: 300px !important;
    }
</style>