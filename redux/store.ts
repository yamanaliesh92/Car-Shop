import { configureStore } from "@reduxjs/toolkit";
import cart, { ICart } from "./cart";
import themeSlice, { IMode } from "./theme";

export interface IRedux {
  theme: IMode;
  cart: ICart;
}

const Store = configureStore({
  reducer: {
    cart: cart,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
