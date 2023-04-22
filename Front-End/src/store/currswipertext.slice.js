import {createSlice} from '@reduxjs/toolkit'

const initialState = {stext: "和平饭店"};

const todoSlice = createSlice({
    name: 'stext',
    initialState,
    reducers: {
        changestext: (state, action) => {
            state.stext = action.payload
        }
    }
});

const { reducer,actions } = todoSlice;
export const { changestext } = actions;
export default reducer;