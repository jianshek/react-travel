//语言切换的action
export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "en";
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: { name: string; code: string };
}

//总体类型定义
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

//创建切换语言action
export const changeLanguageActionCreator = (
    languageCode: "zh" | "en"
): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode,
    };
};

//创建增加语言action
export const addLanguageActionCreator = (
    name: string,
    code: string
): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code },
    };
};
