import { createSlice } from "@reduxjs/toolkit";


interface Details{
    type:string,
    first_name:string,
    last_name:string,
}

interface User {
    user: null | Details;
}


const initialState:User = {
    user:null,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        setUser(state, action){
            const user_details = action.payload.user;
            return {user:{type:user_details.type, first_name:user_details.first_name, last_name:user_details.last_name}}
        },

        clearUser(state, action){
            return initialState
        }
    }
})


export const UserAction = userSlice.actions;
export default userSlice;