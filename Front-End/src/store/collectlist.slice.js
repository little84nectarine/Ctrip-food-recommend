import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    collectobj : [{dishes:[
        {dishName:"芙蓉蛋",
        dishImg: "https://dimg05.c-ctrip.com/images/0104v1200085phs7jC915_D_180_180.jpg?proc=autoorient"},
        {dishName:"红烧翅尖",
        dishImg: "https://dimg04.c-ctrip.com/images/0100f1200085pg5yeD571_D_180_180.jpg?proc=autoorient"},
        {dishName:"鲍鱼扣肉",
        dishImg: "https://dimg01.c-ctrip.com/images/0104m1200085phhh03A13_D_180_180.jpg?proc=autoorient"}
    ],
        restName:'红盔甲'},
        {dishes:[
            {dishName:"芙蓉蛋",
            dishImg: "https://dimg05.c-ctrip.com/images/0104v1200085phs7jC915_D_180_180.jpg?proc=autoorient"},
            {dishName:"红烧翅尖",
            dishImg: "https://dimg04.c-ctrip.com/images/0100f1200085pg5yeD571_D_180_180.jpg?proc=autoorient"},
            {dishName:"鲍鱼扣肉",
            dishImg: "https://dimg01.c-ctrip.com/images/0104m1200085phhh03A13_D_180_180.jpg?proc=autoorient"}
        ],
            restName:'阿娘面'}]
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