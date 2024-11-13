import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("/api/v1/products")
            return await response.json()
        } catch (e) {
            console.error("Products fetching has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)