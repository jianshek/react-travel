
//使用toolkit请求详情页数据

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null,
};

/**
 * "productDetail/getProductDetail":命名空间   
 * createAsyncThunk会返回异步请求的三个状态, pending,fulfilled,rejected
 * touristRouteId:请求参数
 * thunkAPI:包含了redux相关操作,比如 thunkAPI.dispatch, thunkAPI.getState等
 */
export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data;
    }
);

/**
 * createSlice,根据命名空间同时生成action和reducer
 */
export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {  //类似源生reducer,https://blog.csdn.net/pig_fu/article/details/113870074

    },
    extraReducers: {  //处理异步的reducer
        [getProductDetail.pending.type]: (state) => {
            //toolkit使用了immer插件,直接修改state数据
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});
