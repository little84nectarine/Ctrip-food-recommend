import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isloading : true
};

const todoSlice = createSlice({
    name: 'isloading',
    initialState,
    reducers: {
        changelistloading: (state,action) => {
            state.isloading = action.payload
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changelistloading } = actions;
export default reducer;