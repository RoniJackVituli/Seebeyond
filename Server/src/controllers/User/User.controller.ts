import { Router } from "express";
import { Request, Response, NextFunction} from "express";
import Controller from "../../../utils/Interfaces/Controller";
import { UserDetails } from "../../../utils/Interfaces/UserDetails";
import HttpException from "../../middlewares/Error/HttpException";
import { UserModel } from "../../Schemas/UserModel";
class UserController implements Controller{
    public router: Router = Router();
    public path: string = '/user'


    constructor(){
        this.initRouters();
    }


    private initRouters = () => {
        this.router.post(`${this.path}/signup`, this.signup);
    }

    public signup = async (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body);
        
        const {user_details}: {user_details?:UserDetails} = req.body;
        try {
            console.log(user_details);
            if(!user_details) throw new HttpException(400,'args are not correct.');
            const {email, first_name, last_name, phone, password, confirm_password, type} = user_details;
            if(!email || !first_name || !last_name || !phone || !password || !confirm_password )  throw new HttpException(400,'missing details.');
            if(password !== confirm_password) throw new HttpException(400,'password fields are not matched.');
            const email_found = await UserModel.findOne({email:email});
            if(email_found) throw new HttpException(400,'this email already exists.');
            (await UserModel.create({
                type,
                first_name,
                last_name, 
                email, 
                phone, 
                password, 
            })).save()
            res.status(200).send({
                message:'Registration Successfully',
                status: 200
            })
        } catch (error:any) {
            next(new HttpException(error.status, error.message));
        }
    }

}





export default UserController;