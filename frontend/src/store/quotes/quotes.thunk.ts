import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../../model/product.model";
import {prepareCreateQuoteInput} from "./quotes.helper";

export const createQuote = createAsyncThunk(
    "quotes/create",
    async (products: Product[], {rejectWithValue}) => {
        try {
            const quoteInput = prepareCreateQuoteInput(products);
            const response = await fetch("/api/v1/quotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quoteInput)
            })

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            return await response.json()
        } catch (e) {
            console.error("Quote creation has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)