import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/products.slice"
import bundleFlowReducer from "./bundle-flow/bundle-flow.slice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        bundleFlow: bundleFlowReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch