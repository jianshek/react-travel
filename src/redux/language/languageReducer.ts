
//用于改变action传给store的数据

import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";


export interface LanguageState {
    language: "en" | "zh";
    languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "English", code: "en" },
    ],
};

/** 
 * state:store返回的数据类型
 * action:页面action来的数据
 * reducer给store返回一个新的state
 * */
 const lanReducer = (state = defaultState, action:LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload); //国际化(修改语言),这么做不好,reducer应该是纯函数,不应该有副作用
            return { ...state, language: action.payload };
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload],
            };
        default:
            return state;
    }
};

export default lanReducer;
