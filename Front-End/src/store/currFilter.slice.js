import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    filterlist : ["0-不限", "0-不限", [[],[]], "默认"]
};

const todoSlice = createSlice({
    name: 'filterlist',
    initialState,
    reducers: {
        changefilterlist: (state, action) => {
            state.filterlist = [...action.payload]
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changefilterlist } = actions;
export default reducer;