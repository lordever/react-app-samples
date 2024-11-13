// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProducts} from "./products.thunk";
import {Product} from "../../model/product.model";

interface ProductState {
    products: Product[]
}

// Define the initial state using that type
const initialState: ProductState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            if (action.payload) {
                state.products = action.payload
            }
        })
    }
})

export default productsSlice.reducer