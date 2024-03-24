import {createSlice} from "@reduxjs/toolkit";

interface IState {
    theme: boolean
}


const initialState: IState = {
    theme: null
}
const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTrigger: (state) => {
            state.theme = !state.theme
        }
    },

})

const {reducer: themeReducer, actions: themeActions} = themeSlice;

export {
    themeReducer,
    themeActions
}
