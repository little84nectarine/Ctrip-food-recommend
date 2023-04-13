import {createSlice} from '@reduxjs/toolkit'

const initialState = {id: 0};

const todoSlice = createSlice({
    name: 'currRest',
    initialState,
    reducers: {
        changeCurr: (state, action) => {
            console.log('====================================');
            console.log(action);
            console.log('====================================');
            state.id = action.payload
        }
    }
});

const { reducer, actions } = todoSlice;
export const { changeCurr } = actions;
export default reducer;