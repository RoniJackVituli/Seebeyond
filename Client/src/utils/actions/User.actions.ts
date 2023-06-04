import axios from 'axios';
import UserDetails from '../interfaces/userDetails';
import LoginData from '../interfaces/LoginData';
import { ResponseType } from '../interfaces/ResponseType';
import { PATH_SERVER } from '../Paths';
import { UserAction } from '../../store/User/User-slice';


export const SignUpAction = async (userDetails:UserDetails):Promise<ResponseType> => {
    try {
        const {data} = await axios.post(`${PATH_SERVER}/user/signup`,{
            user_details:{...userDetails},
        })
        return data;
    } catch (error:any) {
        return error.response.data;
    }
}
export const getUserInfo = async (logindata:LoginData,dispatch:any):Promise<ResponseType> => {
    try {
        const {data} = await axios.post(`${PATH_SERVER}/user/login`,{
            ...logindata
        })
        dispatch(UserAction.setUser({user:data.data}))
        return data;
    } catch (error:any) {
        return error.response.data;
    }
}
export const findVolunteer = async (email:string):Promise<ResponseType> =>{
    try {
        const {data} = await axios.post(`${PATH_SERVER}/blind/needhelp`,{
            email:email
        })
        return data;
        
    } catch (error:any) {
        return error.response.data;
        
    }
}

export const FindNextVolunteer = async (email_volunteer:string, email_blind:string):Promise<ResponseType> =>{ 
    try {
        const {data} = await axios.post(`${PATH_SERVER}/blind/next`,{
            email_volunteer,
            email_blind
        })
        return data;
        
    } catch (error:any) {
        return error.response.data;
        
    }
}


export const RateVolunteer = async (dispatch:any, correct_user:any ,rate:{rate:number, message:string ,title:string}, user:any):Promise<ResponseType> => {
    try {
        debugger;
        const {data} = await axios.post(`${PATH_SERVER}/${user.type}/rate`,{
            rate,
            email:user.email,
            [correct_user.type]: correct_user,
        })
        await dispatch(UserAction.setUser({user:data.data}));
        return data;
        
    } catch (error:any) {
        return error.response.data;
        
    }
}