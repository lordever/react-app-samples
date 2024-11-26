import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../../model/product.model";
import {PRODUCT_PURCHASE_SLICE_NAME} from "./product-purchase-flow.constant";
import {QuoteServiceFactory} from "../../services/quote/QuoteServiceFactory";
import {Quote} from "../../model/quote.model";

const quoteService = QuoteServiceFactory.getQuoteService();

export const addProductsToQuote = createAsyncThunk(
    `${PRODUCT_PURCHASE_SLICE_NAME}/addProductsToQuote`,
    async (products: Product[], {rejectWithValue, dispatch}) => {
        try {
            const result: Quote = await quoteService.createQuote(products)

            return result;
        } catch (e) {
            console.error("Add products to quote has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)