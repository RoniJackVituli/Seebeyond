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