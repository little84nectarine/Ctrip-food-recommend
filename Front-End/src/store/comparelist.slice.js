import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    comparelist : []
};

const todoSlice = createSlice({
    name: 'comparelist',
    initialState,
    reducers: {
        changecomparelist: (state, action) => {
            state.comparelist = [...action.payload]
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changecomparelist } = actions;
export default reducer;