import {createSlice} from '@reduxjs/toolkit'

const initialState = {id: 1};

const todoSlice = createSlice({
    name: 'currRest',
    initialState,
    reducers: {
        changeCurr: (state, action) => {
            state.id = action.payload
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changeCurr } = actions;
export default reducer;