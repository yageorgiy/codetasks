export default {
    app: {
        widget: {
            login: {
                "title": "Авторизация",

                "email": "E-mail",
                "password": "Пароль",
                placeholders: {
                    "email": "example@domain.com",
                    "password": "******"
                },

                "rememberMe": "Запомнить меня",
                "forgotPassword": "Забыли пароль?",
                "signUp": "Регистрация",
                "signIn": "Войти"
            }
        }
    },

    home: {
        title: "Главная",

        contents: {
            h1: "Добро-пожаловать!",
            p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor tellus, tempor vel dolor a, rhoncus dignissim urna. Vestibulum tristique massa nunc, ut et leo.",

            "card1": {
                title: "Mauris id",
                contents: "Aenean auctor sit amet est a tempus. Curabitur eget tempor sapien. Nam viverra fringilla sodales."
            },
            "card2": {
                title: "Vivamus elit libero",
                contents: "Aenean auctor sit amet est a tempus. Curabitur eget tempor sapien. Nam viverra fringilla sodales."
            },
            "card3": {
                title: "Pellentesque placerat",
                contents: "Quisque porta sapien. Duis rutrum arcu ex. Etiam feugiat est maximus."
            }
        }

    },

    profile: {
        title: "Профиль",

        firstName: "Имя:",
        lastName: "Фамилия:",
        middleInitial: "Отчество:",
        email: "E-mail:"

    },

    tasks: {
        title: "Задачи",

        category: "Категория: {name}",
        categoryDescription: "Описание категории:",
        task: "Задача: {name}",
        input: {
            title: "Входные данные:",
            instance: {
                subtitle: "Тип: {type}.",
                dimensions: "Размеры массива: {dimensions}."
            }
        },

        tabs: {
            description: "Описание",
            submits: "Отправленные попытки"
        },

        output: "Выходные данные:",
        solution: "Код:",

        submit: "Отправить"
    }
};