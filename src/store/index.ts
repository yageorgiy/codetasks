import Vue from 'vue'
import Vuex from 'vuex'
import Unit from "@/ts/class/Unit";
import Task from "@/ts/class/Task";
import faker from '@faker-js/faker';
import Input from "@/ts/class/Input";

Vue.use(Vuex);


const Store = new Vuex.Store({
    state: {
        // categories: ,
        // test: 10
    },
    mutations: {
        // increment (state) {
            // state.test++
        // }
    },
    actions: {

    },
    modules: {

    }
});

export default Store;
