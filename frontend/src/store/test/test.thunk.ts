import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTestArr = createAsyncThunk(
    "products/fetchAll",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("/api/v1/test")
            return await response.json()
        } catch (e) {
            console.error("Products fetching has been failed: ", e);
            return rejectWithValue(e)
        }
    }
)