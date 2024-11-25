import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Quote} from "../../model/quote.model";
import {createQuote} from "./quotes.thunk";

interface QuotesState {
    quote?: Quote | null;
    loading: boolean;
}

// Define the initial state using that type
const initialState: QuotesState = {
    quote: undefined,
    loading: false
};

export const quotesSlice = createSlice({
    name: 'quotes',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearQuote(state) {
            state.quote = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createQuote.pending, (state) => {
            state.loading = true;
        }).addCase(createQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
            if (action.payload) {
                state.quote = action.payload;
            }

            state.loading = false;
        }).addCase(createQuote.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { clearQuote } = quotesSlice.actions;

export default quotesSlice.reducer