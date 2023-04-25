import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    restList : []
};

const todoSlice = createSlice({
    name: 'restList',
    initialState,
    reducers: {
        changeList: (state, action) => {
            state.restList = [...action.payload]
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changeList } = actions;
export default reducer;