import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    pagecount : 0
};

const todoSlice = createSlice({
    name: 'pagecount',
    initialState,
    reducers: {
        increasecount: (state) => {
            state.pagecount = state.pagecount+1
        },
        restart:(state)=>{
            state.pagecount = 0
        }
    }
});

const { reducer, actions } = todoSlice;
export const { increasecount,restart } = actions;
export default reducer;