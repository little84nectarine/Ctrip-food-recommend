import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isend: true
};

const todoSlice = createSlice({
    name: 'islistEnd',
    initialState,
    reducers: {
        changeEnd: (state, action) => {
            state.isend = action.payload
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changeEnd } = actions;
export default reducer;