// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTestArr} from "./test.thunk";

interface TestState {
    testArr: string[]
}

// Define the initial state using that type
const initialState: TestState = {
    testArr: []
}

export const testSlice = createSlice({
    name: 'test',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTestArr.fulfilled, (state, action: PayloadAction<string[]>) => {
            if (action.payload) {
                state.testArr = action.payload
            }
        })
    }
})

export default testSlice.reducer