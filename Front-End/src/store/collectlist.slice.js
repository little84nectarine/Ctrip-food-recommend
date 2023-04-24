import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    collectobj : []
};

const todoSlice = createSlice({
    name: 'collectobj',
    initialState,
    reducers: {
        changecollectobj: (state, action) => {
            state.collectlist = [...action.payload]
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changecollectobj } = actions;
export default reducer;