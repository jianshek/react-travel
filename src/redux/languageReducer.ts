
//用于改变action传给store的数据

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
export default (state = defaultState, action) => {
    switch (action.type) {
        case "change_language":
            return { ...state, language: action.payload };
        case "add_language":
            return {
                ...state,
                languageList: [...state.languageList, action.payload],
            };
        default:
            return state;
    }
};
