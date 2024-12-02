import {createAsyncThunk} from "@reduxjs/toolkit";
import {Characteristic, Product} from "../../model/product.model";
import {BUNDLE_FLOW_SLICE_NAME} from "./bundle-flow.constant";
import {QuoteServiceFactory} from "../../services/quote/QuoteServiceFactory";
import {Quote} from "../../model/quote.model";
import {QuoteItemServiceFactory} from "../../services/quote/QuoteItemServiceFactory";

const quoteService = QuoteServiceFactory.getQuoteService();
const baseQuoteItemService = QuoteItemServiceFactory.getBaseQuoteItemService();

export const addProductsToQuote = createAsyncThunk(
    `${BUNDLE_FLOW_SLICE_NAME}/addProductsToQuote`,
    async (products: Product[], {rejectWithValue}) => {
        try {
            const result: Quote = await quoteService.createQuote(products)

            return result;
        } catch (e) {
            console.error("Add products to quote has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)

export const updateCharacteristicsOnQuote = createAsyncThunk(
    `${BUNDLE_FLOW_SLICE_NAME}/updateCharacteristicsOnQuote`,
    async (input: { quoteItemId: number, characteristics: Characteristic[] }, {rejectWithValue}) => {
        try {
            const {quoteItemId, characteristics} = input;
            const result: Quote | undefined = await baseQuoteItemService.updateCharacteristics(quoteItemId, characteristics)

            return result;
        } catch (e) {
            console.error("Update characteristics on quote item has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)