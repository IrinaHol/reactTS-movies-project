import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {IError} from "../../interfaces";

interface IState {
    isLoading: boolean,
    errors: IError
}
const initialState:IState = {
    isLoading: null,
    errors: null
}
const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(), state => {
                state.isLoading = false;
                state.errors = null;
            })
            .addMatcher(isPending(), state => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(), (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
})

const {reducer: loadingReducer} = loadingSlice;

export {
    loadingReducer
}