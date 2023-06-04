import { createSlice } from "@reduxjs/toolkit";


interface Details{
    type:string,
    first_name:string,
    last_name:string,
    volunteer:any,
    blind:{email:string, first_name:string, last_name:string, _id:string},
    email:string,
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
            const {first_name,last_name,email, blind, volunteer ,type} = action.payload.user;
            return {user:{type, first_name, last_name, email, volunteer, blind}}
        },

        clearUser(state){
            return initialState
        }
    }
})


export const UserAction = userSlice.actions;
export default userSlice;