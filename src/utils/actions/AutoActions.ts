import axios from 'axios';
import UserDetails from '../interfaces/userDetails';
import PATH from './Path'

const signUp = async (user:UserDetails) => {
    try {
        const { data} = await axios.post(`${PATH}auth/signup`, user);


        
    } catch (error) {
        
    }
    
}