import {RootState} from "../store";

export const selectQuote = (state: RootState) => state.quotes.quote
export const selectQuoteLoading = (state: RootState) => state.quotes.loading