import {TranslateResult} from "vue-i18n";

type URL = {
    title: TranslateResult,
    url: string
};

type LoginForm = {
    email: string,
    password: string
};

type ProfileForm = {
    // firstName: string;
    // middleInitial: string;
    // lastName: string;
    name: string;
    email: string;
};

type RegisterForm = {
    email: string,
    name: string,
    password: string
};

enum Method {
    GET = 0,
    POST = 1
};

export {
    URL,
    LoginForm,
    ProfileForm,
    RegisterForm,

    Method
};