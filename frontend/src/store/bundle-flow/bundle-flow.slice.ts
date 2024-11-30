// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Quote} from "../../model/quote.model";
import {addProductsToQuote} from "./bundle-flow.thunk";
import {BUNDLE_FLOW_SLICE_NAME} from "./bundle-flow.constant";

interface BundleFlowState {
    quote?: Quote | null
    quoteLoading: boolean;
}

// Define the initial state using that type
const initialState: BundleFlowState = {
    quote: null,
    quoteLoading: false
}

export const bundleFlowSlice = createSlice({
    name: BUNDLE_FLOW_SLICE_NAME,
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

export const {clearQuote} = bundleFlowSlice.actions

export default bundleFlowSlice.reducer