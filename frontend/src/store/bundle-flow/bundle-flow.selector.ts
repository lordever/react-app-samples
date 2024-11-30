import {RootState} from "../store";

export const selectProductPurchaseQuoteCreateLoading = (state: RootState) => state.bundleFlow.quoteLoading
export const selectProductPurchaseQuote = (state: RootState) => state.bundleFlow.quote