<template>
    <div class="task">
        <h1>
            <b-icon
                icon="check-circle-fill"
                v-if="task.completed === 1"
                variant="success"
                :title="$t('tasks.completed.tooltip')"
            ></b-icon>
            {{task.title}}
        </h1>
        <b-card no-body>
            <b-tabs card>
                <b-tab :title="$t('tasks.tabs.description')" active>
                    <b-card-text>
                        <p>{{task.description}}</p>

                        <div class="task-input" v-if="task.inputs.length > 0">
                            <h3>{{$t('tasks.input.title')}}</h3>
                            <b-card-group columns deck class="d-flex align-content-end input-cards">
                                <b-card
                                        class="input-card mb-4"
                                        v-for="input in task.inputs"
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
                        </div>

                        <h3>{{$t('tasks.output')}}</h3>
                        <p>{{task.output}}</p>
                    </b-card-text>
                </b-tab>
<!--                <b-tab :title="$t('tasks.tabs.submits')">-->
<!--                    <b-card-text>-->
<!--                        TODO-->
<!--                    </b-card-text>-->
<!--                </b-tab>-->
            </b-tabs>
        </b-card>

        <h3>{{$t('tasks.solution')}}</h3>


        <!-- Language select -->
        <b-dropdown
            v-if="languages.length > 0"
            :text="(language !== undefined && language !== '') ? $t('tasks.language', {lang: $t('lang.' + language)}) : ''"
            class="mb-3"
            block
            menu-class="w-100"
        >
            <b-dropdown-item
                v-for="i in languages"
                @click="changeLanguage(i)"
            >
                {{$t('lang.' + i)}}
            </b-dropdown-item>
        </b-dropdown>
        <b-alert v-else show variant="danger">
            {{$t('app.errors.noLanguagesError')}}
        </b-alert>

        <!-- Success -->
        <b-alert v-if="success" variant="success" show id="successMessage">
            <b-icon icon="check-circle-fill" ></b-icon> {{$t("tasks.success", {score: task.score})}}
        </b-alert>

        <!-- Code errors -->
        <b-alert v-if="!submitApiCall.isBusy && submitApiCall.error !== ''" variant="danger" show id="taskError">
            {{submitApiCall.error}}

            <div v-if="task.lastError.error_data">

                <!-- Compiler message -->
                <pre v-if="task.lastError.error_data.msg">
                    {{task.lastError.error_data.msg}}
                </pre>

                <!-- Test inputs -->
                <pre v-if="task.lastError.error_data.params">{{$t("tasks.inputs", {
                    inputs: task.lastError.error_data.params.split(";").join(" ")
                })}}</pre>

                <!-- Test expected value -->
                <pre v-if="task.lastError.error_data.expected">{{$t("tasks.expected", {
                    result: task.lastError.error_data.expected
                })}}</pre>

                <!-- Test result value -->
                <pre v-if="task.lastError.error_data.result">{{$t("tasks.result", {
                    length: task.lastError.error_data.result.length,
                    result: task.lastError.error_data.result
                })}}</pre>
            </div>
        </b-alert>

        <label v-if="task.lastError.error_data">
            {{$t("tasks.lastResult", {
                passed: task.lastError.error_data.tests_passed,
                all: task.lastError.error_data.tests_total
            })}}
        </label>

        <!-- Code editor -->
        <!-- TODO: remove black border from Chrome and Opera -->
        <prism-editor
            v-if="language !== '' && language !== undefined"
            class="editor"
            v-model="code"
            :highlight="highlighter"
            @input="onCodeEdited"
            :tabSize="4"
            line-numbers
        ></prism-editor>

        <!-- Bottom nav bar -->
        <b-navbar type="light" variant="light" class="mt-4 bottom-bar">
            <b-navbar-nav class="ml-auto w-100">
                <b-nav-text>
                    {{$t('tasks.score', {gained: task.score * task.completed, all: task.score})}}
                </b-nav-text>

                <b-nav-form class="ml-auto">
                    <b-button
                        :disabled="languages.length <= 0 || language === '' || language === undefined || submitApiCall.isBusy"
                        variant="outline-primary"
                        class="my-2 my-sm-0"
                        @click="submit"
                        ref="submitButton"
                    >
                        <b-icon icon="x-circle-fill" variant="danger" v-if="languages.length <= 0 || language === '' || language === undefined"></b-icon>
                        <b-icon icon="clock" animation="throb" v-if="submitApiCall.isBusy"></b-icon>
                        {{$t('tasks.submit')}}
                    </b-button>
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
    import 'prismjs/components/prism-pascal';
    import 'prismjs/components/prism-csharp';
    import 'prismjs/components/prism-java';
    import 'prismjs/components/prism-python';
    import 'prismjs/components/prism-javascript';

    import 'prismjs/themes/prism.css'; // import syntax highlighting styles

    import Vue from 'vue';
    import Input from '@/ts/class/Input';
    import { Client } from '@/ts/class/api/Client';
    import Task from "@/ts/class/Task";
    import {ApiCall} from "@/ts/class/api/ApiCall";
    import { TaskErrorType } from '@/ts/types';
    import languageTypesMap from "@/ts/prismjs/languageTypesMap";


    export default Vue.extend({
        name: "Task",

        props: {
            client: Client,
            task: Task,
            languages: Array
        },

        data: () => ({
            $t: $t,
            router: router,

            // compileError: "",
            language: "",
            // languages: [] as Array<string>,
            code: "",
            codeEdited: false,

            submitApiCall: new ApiCall(null),
            inputs: [] as Input[],

            success: false,
            // addScore: 0
        }),

        mounted(){
            this.language = this.languages[0] as string;
            this.getTemplateFromCurrentLanguage();
        },

        methods: {

            highlighter(code: string) {

                // languages.<insert language> to return html with markup
                return highlight(code,
                    languages[languageTypesMap[this.language]] || languages[this.language] || "c"
                );
            },

            submit(){
                this.submitApiCall = this.client.solution(this.client.token, this.code, this.language, this.task.id);

                this.task.lastError = {} as TaskErrorType;

                const _this = this;
                this.submitApiCall.onError = (data: any) => {
                    // _this.compileError = "";
                    // if(data.error_data !== undefined && data.error_data.msg !== undefined)
                    //     _this.compileError = data.error_data.msg;

                    this.task.lastError = data;

                    if(data.score_diff !== undefined)
                        this.task.completed += data.score_diff;

                    _this.$nextTick(() => { this.$scrollTo("#taskError", {
                        offset: -120
                    }); });
                };

                this.submitApiCall.onSuccess = (data: any) => {
                    // _this.addScore = data.score_diff || 0;
                    _this.success = true;

                    _this.task.completed = 1;

                    _this.$nextTick(() => { this.$scrollTo("#successMessage", {
                        offset: -120
                    }); });
                };
            },

            getTemplateFromCurrentLanguage(){
                // if edited before request has been made
                if(this.codeEdited) {
                    return;
                }

                const _this = this;

                const apiCall = this.client.template(this.client.token, this.language);
                apiCall.onSuccess = (data: any) => {
                    // if edited after request has been made
                    if(!_this.codeEdited) {
                        _this.code = data.template || "";
                        _this.$forceUpdate();
                    }
                };

            },

            onCodeEdited(){
                this.codeEdited = true;
            },

            changeLanguage(lang: string){
                this.language = lang;
                this.getTemplateFromCurrentLanguage();
            }
        }
    });
</script>

<style scoped>
    .editor{
        background-color: #f1f4f7;
    }

    .input-cards {
        overflow: auto;
    }


    .input-card {
        min-width: 300px !important;
    }
</style>

<style>
    .prism-editor__textarea:focus::selection{
        color: white !important; /* does nothing */
        background: rgba(0, 0, 255, 0.29) !important;
    }

    .prism-editor__textarea::selection{
        color: white; /* does nothing */
        background: rgba(0, 0, 0, 0.3);
    }
</style>