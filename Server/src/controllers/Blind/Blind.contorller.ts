import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../../utils/Interfaces/Controller";
import { UserModel } from "../../Schemas/UserModel";
import { send_email_to_client } from "../../../utils/functions/sendEmail";
import HttpException from "../../middlewares/Error/HttpException";

class BlindController implements Controller {
  public router: Router = Router();
  public path: string = "/blind";

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/needhelp`, this.INeedHelp);
  }

  private INeedHelp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        const blind_user = await UserModel.findOne({email:email});
        const volunteer_user = await UserModel.findOne({ type: 'volunteer', available: 'yes'}).sort({ rate: -1 })
        if(!blind_user || !volunteer_user) throw new HttpException(404, 'email not send');

        await send_email_to_client(volunteer_user, blind_user)
        res.status(200).send({status:200,message:'ok', data:[]});
    } catch (error:any) {
        next(new HttpException(error.status, error.message));
    }
  };
}
