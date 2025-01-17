import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./thunks";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user:[],
        length : 0,
        loading: false,
        error: null,
    },
    reducers:{
        adduser : (state, action)=>{
           state.user.push(action.payload);
           state.length++;
        },
        removeUser:(state,action)=>{
            state.user.splice(action.payload,1),
            state.length = state.user.length;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(fetchUsers.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.length = action.payload.length;
            state.loading = false;
        }).addCase(fetchUsers.rejected,(state)=>{
            state.user=[];
            state.loading = false;
            state.error = true;
        })// Simulating "settled"
        .addMatcher(
            (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
            (state) => {
                console.log('Request completed, success or failure');
            }
        )
    }
})



export const {adduser,removeUser}= userSlice.actions;
export default userSlice.reducer;