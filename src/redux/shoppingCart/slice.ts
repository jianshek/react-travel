
//购物车

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCarttate {
  loading: boolean;
  error: string | null;
  items: any[];   //添加购物车的商品
}

const initialState: ShoppingCarttate = {
  loading: true,
  error: null,
  items: [],
};

//货物购物车商品数量
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/shoppingCart`,  
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

//添加到购物车
export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,  //body参数
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

//下单支付
export const checkout = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/checkout`,
      null,  //body不需要参数
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

//清空购物车
export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [clearShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [checkout.pending.type]: (state) => {
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [checkout.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
