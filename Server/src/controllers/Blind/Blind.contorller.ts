import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../../utils/Interfaces/Controller";
import { UserModel } from "../../Schemas/UserModel";
import {
  send_email_found_another_volunteer,
  send_email_to_client,
} from "../../../utils/functions/sendEmail";
import HttpException from "../../middlewares/Error/HttpException";

class BlindController implements Controller {
  public router: Router = Router();
  public path: string = "/blind";

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/needhelp`, this.INeedHelp);
    this.router.post(`${this.path}/next`, this.FindNextVolunteer);
    this.router.post(`${this.path}/rate`, this.rateVolunteer);
    this.router.post(`${this.path}/cancel`, this.cancelRequest);
  }

  private INeedHelp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    try {
      await this.delay(3000);
      const blind_user = await UserModel.findOne({ email: email });
      const volunteer_user = await UserModel.findOne({
        type: "volunteer",
        available: true,
      }).sort({ rate: -1 });
      if (!blind_user || !volunteer_user)
        throw new HttpException(404, "email not send");
      await send_email_to_client(volunteer_user, blind_user);

      volunteer_user.available = false;
      volunteer_user.blind = blind_user.id;
      blind_user.volunteer = volunteer_user.id;

      await blind_user.save();
      await volunteer_user.save();

      res.status(200).send({
        status: 200,
        message: "ok",
        data: {
          volunteer: {
            first_name: volunteer_user.first_name,
            last_name: volunteer_user.last_name,
            phone: volunteer_user.phone,
            email: volunteer_user.email,
            reviews: volunteer_user.reviews,
            type: volunteer_user.type,
          },
        },
      });
    } catch (error: any) {
      console.log(error.message);

      next(new HttpException(error.status, error.message));
    }
  };

  private FindNextVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email_volunteer, email_blind } = req.body;
    try {
      await this.delay(3000);
      const blind_user = await UserModel.findOne({ email: email_blind });
      const old_volunteer_user = await UserModel.findOne({
        email: email_volunteer,
      });
      const new_volunteer_user = await UserModel.findOne({
        type: "volunteer",
        available: "yes",
        email: { $ne: email_volunteer },
      }).sort({ rate: -1 });

      if (!new_volunteer_user || !blind_user || !old_volunteer_user)
        throw new HttpException(404, "email not send");
      await send_email_to_client(new_volunteer_user, blind_user);
      await send_email_found_another_volunteer(old_volunteer_user, blind_user);

      new_volunteer_user.available = false;
      new_volunteer_user.blind = blind_user.id;

      old_volunteer_user.available = true;
      old_volunteer_user.blind = undefined;

      await old_volunteer_user.save();
      await new_volunteer_user.save();

      res.status(200).send({
        status: 200,
        message: "ok",
        data: {
          volunteer: {
            first_name: new_volunteer_user.first_name,
            last_name: new_volunteer_user.last_name,
            phone: new_volunteer_user.phone,
            email: new_volunteer_user.email,
            reviews: new_volunteer_user.reviews,
            type: new_volunteer_user.type,
          },
        },
      });
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  };

  private cancelRequest = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { email,email_blind} = req.body;
      
      const volunteer_user = await UserModel.findOne({email});
      const blind_user = await UserModel.findOne({email_blind});
    
      if(!volunteer_user|| !blind_user) throw new HttpException(400, 'auth faild!');
      
      volunteer_user.available = true;
      await send_email_found_another_volunteer(volunteer_user,blind_user)
      await volunteer_user.save();
      
      res.status(200).send({message:'Volunteer Canceled', data: {
        available: volunteer_user.available,
        }, status:200});

    } catch (error:any) {
      next(new HttpException(error.status, error.message));

    }
  }

  private rateVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { rate, email, volunteer } = req.body;

      const user = await UserModel.findOne({ email });
      const volunteer_user = await UserModel.findOne({
        email: volunteer.email,
      });

      if (!user || !volunteer_user) throw new HttpException(400, "auth faild!");
      user.reviews = [
        ...user.reviews,
        { title: rate.title, content: rate.message, rate: rate.rate },
      ];

      (volunteer_user.blind = undefined), (volunteer_user.available = true);

      calculateAverageRate(user);
      await user.save();
      await volunteer_user.save();

      res.status(200).send({
        message: "Rate add.",
        data: {
          first_name: volunteer_user.first_name,
          last_name: volunteer_user.last_name,
          email: volunteer_user.email,
          blind: volunteer_user.blind,
          type: volunteer_user.type,
        },
        status: 200,
      });
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  };

  private delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
function calculateAverageRate(user: any): void {
  if (user.reviews.length === 0) {
    user.rate = 0; // Set rate to 0 if there are no reviews
  } else {
    const totalRate = user.reviews.reduce(
      (sum: number, review: any) => sum + parseFloat(review.rate),
      0
    );
    user.rate = totalRate / user.reviews.length; // Calculate average rate
  }
}

export default BlindController;
