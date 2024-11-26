// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Quote} from "../../model/quote.model";
import {addProductsToQuote} from "./product-purchase-flow.thunk";
import {PRODUCT_PURCHASE_SLICE_NAME} from "./product-purchase-flow.constant";

interface ProductPurchaseFlowState {
    quote?: Quote | null
    quoteLoading: boolean;
}

// Define the initial state using that type
const initialState: ProductPurchaseFlowState = {
    quote: null,
    quoteLoading: false
}

export const productPurchaseFlowSlice = createSlice({
    name: PRODUCT_PURCHASE_SLICE_NAME,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearQuote(state) {
            state.quote = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductsToQuote.pending, (state) => {
                state.quoteLoading = true
            })
            .addCase(addProductsToQuote.rejected, (state) => {
                state.quoteLoading = false
            })
            .addCase(addProductsToQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
                if (action.payload) {
                    state.quote = action.payload;
                }
                state.quoteLoading = false;
            })
    }
})

export const {clearQuote} = productPurchaseFlowSlice.actions

export default productPurchaseFlowSlice.reducer