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

type TaskErrorType = {
    error?: number,
    error_data?: {
        params?: string,
        expected?: string,
        result?: string,
        tests_passed?: number,
        tests_total?: number,
        msg?: string
    },
    score_diff: number
}

export {
    URL,
    LoginForm,
    ProfileForm,
    RegisterForm,

    TaskErrorType,

    Method
};