import Vue from 'vue'
import Vuex from 'vuex'
import Category from "@/ts/class/Category";
import Task from "@/ts/class/Task";
import faker from '@faker-js/faker';
import Input from "@/ts/class/Input";

Vue.use(Vuex);

/* Example categories */

let sampleTitles: string[] = [
    "Яблоки и мандарины",
    "Три ученика",
    "Большой зуб",
    "Для чего нужна щетка?",
    "Звезды",
    "Динамическое программирование",
    "Подсчитай крабов",
    "Средний по трапеции",
    "Самая умная улитка",
    "Коэффициент храбрости",
    "Отличная находка",
    "Где палочка?",
    "Интересное решение для фестиваля",
    "Сложный интеграл",
    "Машинки"
];
let generatedTasks: Task[] = [];

for(let title of sampleTitles){
    generatedTasks.push(new Task(
        title,
        faker.lorem.paragraph(3),
        faker.datatype.number({
            min: 1,
            max: 5,
            precision: 1,
        }),
        faker.datatype.number({
            min: 128,
            max: 1024,
            precision: 16,
        }),
        faker.datatype.number({
            min: 0.5,
            max: 4,
            precision: 0.5,
        }),
        "c",
        "int main(){\n  // Code goes here\n\n  return 0;\n}\n",
        faker.lorem.paragraph(2)
    ).addInput(
        new Input(
            "A",
            "int",
            faker.datatype.number({min:1, max:10}),
            faker.datatype.number({min:20, max:30}),
            [2]
        ),
        new Input(
            "B",
            "int",
            faker.datatype.number({min:1, max:10}),
            faker.datatype.number({min:20, max:30}),
            [1]
        ),
        new Input(
            "C",
            "int",
            faker.datatype.number({min:1, max:10}),
            faker.datatype.number({min:20, max:30}),
            [5,7,3]
        ),
        new Input(
            "D",
            "int",
            faker.datatype.number({min:1, max:10}),
            faker.datatype.number({min:20, max:30}),
            [6,7]
        )
    ));
}

let _categories: Array<Category> = [
    new Category(
        "Категория 1",
        "Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor.",
    ).addTasks(generatedTasks.slice(0, 4)),
    new Category(
        "Категория 2",
        "Consequat non elit enim exercitation cillum."
    ).addTasks(generatedTasks.slice(5, 7)),
    new Category(
        "Категория 3",
        "Aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est."
    ).addTasks(generatedTasks.slice(8, 11)),
    new Category(
        "Категория 4",
        "Duis laboris ad sit ipsum anim Lorem."
    ).addTasks(generatedTasks.slice(12, 15)),
];

const Store = new Vuex.Store({
    state: {
        categories: _categories,
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
