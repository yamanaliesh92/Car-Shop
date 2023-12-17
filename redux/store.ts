import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import themeSlice from "./theme";

const Store = configureStore({
  reducer: {
    cart: cart,
    theme: themeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
