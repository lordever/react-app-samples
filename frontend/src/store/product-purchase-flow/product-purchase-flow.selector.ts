import {RootState} from "../store";

export const selectProductPurchaseQuoteCreateLoading = (state: RootState) => state.productPurchaseFlow.quoteLoading
export const selectProductPurchaseQuote = (state: RootState) => state.productPurchaseFlow.quote