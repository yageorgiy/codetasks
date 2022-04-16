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
            },
            logout: "Выйти"
        },

        loading: "Загрузка...",

        errors: {
            errorPrefix: "Ошибка выполнения запроса на сервер: {details}",

            anyConnectionError: "Не удалось соединиться с сервером.",

            reloginError: "Требуется войти в аккаунт",
            noLanguagesError: "Языки программирования не были загружены. Пожалуйста, обновите страницу или попробуйте позже.",

            e0: "Ошибок нет",                                                                           // NoError
            e1: "Внутренняя ошибка сервера",                                                            // Internal
            e2: "Действие запрещено",                                                                   // MethodNotSupported

            e100: "Поле 'e-mail' не заполнено",                                                         // EmailNotProvided
            e101: "Поле 'e-mail' введено неверно",                                                      // EmailInvalid
            e102: "E-mail не зарегистрирован",                                                          // EmailUnknown
            e103: "E-mail уже зарегистрирован",                                                         // EmailTaken

            e200: "Поле пароля не заполнено",                                                           // PasswordNotProvided
            e201: "Неверный формат пароля (слишком короткий пароль)",                                   // PasswordInvalid
            e202: "Неверный пароль",                                                                    // PasswordWrong

            e300: "Ключ сессии не предоставлен (ошибка приложения)",                                    // TokenNotProvided
            e301: "Ключ сессии неверный (ошибка приложения)",                                           // TokenInvalid
            e302: "Неизвестный ключ сессии (ошибка приложения)",                                        // TokenUnknown
            e303: "Подтвердите вход, перейдя по ссылке из письма (проверьте почту)",       // TokenNotVerified
            e304: "Вход был совершён с другого IP-адреса",                                              // TokenBoundToOtherIP

            e400: "Не предоставлен номер задания",                                                      // TaskIdNotProvided
            e401: "Неверный номер задания",                                                             // TaskIdInvalid
            e402: "Задание не найдено",                                                                 // TaskNotFound

            e500: "Код решения не предоставлен",                                                        // SolutionTextNotProvided
            e501: "Код решения слишком длинный",                                                        // SolutionTextTooLong
            e502: "Слишком длинные тесты для проверки",                                                 // SolutionTestsTooLong
            e503: "Некорректно установлены тесты для проверки",                                         // SolutionTestsInvalid
            e504: "Ошибка сборки кода решения",                                                         // SolutionBuildFail
            e505: "Ошибка тестирования предоставленного решения",                                       // SolutionTestFail
            e506: "Программа работает слишком долго",                                                   // SolutionTimeoutFail
            e507: "Ошибка выполнения программы решения",                                                // SolutionRuntimeFail

            e600: "Язык программирования не предоставлен",                                              // LanguageNotProvided
            e601: "Данный язык программирования не поддерживается",                                     // LanguageNotSupported

            e700: "Имя не предоставлено",                                                               // NameNotProvided
            e701: "Неверное имя",                                                                       // NameInvalid

            e800: "",                                                                                   // TasksFoldersInvalid
            e801: "",                                                                                   // TasksProjectFolderNotFound
            e802: "",                                                                                   // TasksUnitFolderNotFound
            e803: "",                                                                                   // TasksTaskFolderNotFound

            e900: "",                                                                                   // LeaderboardProjectIdNotProvided
            e901: "",                                                                                   // LeaderboardProjectFolderNotProvided
        }
    },

    errorPages: {
        e404: {
            title: "4🙀4",
            subtitle: "Кажется, что-то куда-то пропало. В любом случае, здесь уже ничего нет...",
            goHome: "На главную"
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

    login: {
        form:{
            email: {
                label: "E-mail",
                placeholder: "Введите адрес электронной почты"
            },
            password: {
                label: "Пароль",
                placeholder: "Введите пароль"
            },
            submit: "Войти"
        },
        errors: {
            incorrectCredentials: "Неверный e-mail или пароль."
        }
    },

    register: {
        succeeded: "Регистрация успешно завершена. Проверьте почту, перейдите по указанной ссылке и войдите в свой аккаунт, используя свои e-mail и пароль.",

        form: {
            title: "Регистрация нового аккаунта",
            name: {
                label: "ФИО:",
                placeholder: "Введите полное имя (фамилия, имя и отчество)"
            },
            email: {
                label: "E-mail",
                placeholder: "Введите адрес электронной почты"
            },
            password: {
                label: "Пароль",
                placeholder: "Введите придуманный пароль",
                description: "Рекомендуем придумать сложный пароль, состоящий из букв разных регистров (a-z, A-Z), цифр (1-9), специальных символов (!@#$%^&*)"
            },
            submit: "Зарегистрироваться"
        }
    },

    profile: {
        title: "Профиль",

        // firstName: "Имя:",
        // lastName: "Фамилия:",
        // middleInitial: "Отчество:",
        name: "ФИО:",
        email: "E-mail:",
        score: "Баллы:"
    },

    tasks: {
        title: "Задачи",

        unit: "Раздел: {name}",
        unitDescription: "Описание раздела:",
        // task: "Задача: {name}",
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

        success: "Ура! Задача верно решена. Набрано баллов: +{score}",
        lastResult: "Тестов пройдено: {passed} из {all}.",

        expected: "Ожидалось:\n{result}",
        inputs: "Вводимые данные:\n{inputs}",
        result: "Результат (количество символов = {length}):\n{result}",

        language: "Язык: {lang}",

        submit: "Отправить"
    },

    lang: {
        c: "С",
        cpp: "C++",
        pas: "Free Pascal",
        py: "Python 3.x"
    }
};