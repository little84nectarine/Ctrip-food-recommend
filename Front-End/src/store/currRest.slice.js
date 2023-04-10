import {createSlice} from '@reduxjs/toolkit'

const initialState = {};

const todoSlice = createSlice({
    name: 'currRest',
    initialState,
    reducers: {
        changeCurr: (state, action) => {
            state.currRest = {...action.payload}
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changeCurr } = actions;
export default reducer;