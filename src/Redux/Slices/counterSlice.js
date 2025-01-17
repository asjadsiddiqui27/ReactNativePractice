import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    num :0,
}


const counterSlicer = createSlice({
    name:"counterSlice",
    initialState:initialValue,
    reducers:{
        increment : (state) => {
            state.num = state.num + 1;
        },
        decrement : (state) => {
            state.num -= 1;
        },
        increamentByPayload : (state,action)=>{
            state.num = state.num + action.payload;
            // state.num += action.payload;  
        }
    }
})

export const { increment, decrement, increamentByPayload } = counterSlicer.actions;
export default counterSlicer.reducer;
