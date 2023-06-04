import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../../utils/Interfaces/Controller";
import { UserModel } from "../../Schemas/UserModel";
import { send_email_to_client } from "../../../utils/functions/sendEmail";
import HttpException from "../../middlewares/Error/HttpException";

class VolunteerController implements Controller {
  public router: Router = Router();
  public path: string = "/volunteer";

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}/next`, this.nextVolunteer);
    this.router.post(`${this.path}/rate`, this.rateVolunteer);
  }

  private nextVolunteer = (req:Request, res:Response, next:NextFunction) => {
    console.log('NEXT');
  }



  private rateVolunteer = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const {rate, email, blind} = req.body;
      
      const blind_user = await UserModel.findOne({email:blind.email});
      const user = await UserModel.findOne({email});

      if(!user || !blind_user) throw new HttpException(400, 'auth faild!');
      user.reviews = [...user.reviews, {title:rate.title, content:rate.message, rate:rate.rate}];
      blind_user.volunteer = undefined;

      calculateAverageRate(user);
      await user.save();
      await blind_user.save();
      
      res.status(200).send({message:'Rate add.',  data: {
        first_name: blind_user.first_name,
        last_name: blind_user.last_name,
        email: blind_user.email,
        blind: blind_user.blind,
        type: blind_user.type,
      }, status:200});

    } catch (error:any) {
      next(new HttpException(error.status, error.message));

    }
  }
}

function calculateAverageRate(user:any): void {
  if (user.reviews.length === 0) {
    user.rate = 0; // Set rate to 0 if there are no reviews
  } else {
    const totalRate = user.reviews.reduce((sum:number, review:any) => sum + parseFloat(review.rate), 0);
    user.rate = totalRate / user.reviews.length; // Calculate average rate
  }
}
export default VolunteerController;
