import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './ru';

Vue.use(VueI18n);

// Locale object
const messages = {
    'ru': ru
};



// i18n instance
export const i18n = new VueI18n({
    locale: 'ru', // current locale
    messages,
});

export const $t = function(key: string, values?: any){
    if (!key) {
        return '';
    }
    return i18n.t(key, values);
};
