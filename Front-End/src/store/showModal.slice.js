import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    modalshow : false
};

const todoSlice = createSlice({
    name: 'modalshow',
    initialState,
    reducers: {
        changemodal: (state,action) => {
            state.modalshow = action.payload
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changemodal } = actions;
export default reducer;