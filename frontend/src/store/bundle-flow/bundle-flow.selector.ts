import {RootState} from "../store";

export const selectBundleFlowQuoteCreateLoading = (state: RootState) => state.bundleFlow.quoteLoading
export const selectBundleFlowQuote = (state: RootState) => state.bundleFlow.quote