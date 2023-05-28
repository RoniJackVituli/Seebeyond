import axios from 'axios';
import UserDetails from '../interfaces/userDetails';
import { ResponseType } from '../interfaces/ResponseType';
import { PATH_SERVER } from '../Paths';


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