import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/products.slice"
import productPurchaseFlowReducer from "./product-purchase-flow/product-purchase-flow.slice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productPurchaseFlow: productPurchaseFlowReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch