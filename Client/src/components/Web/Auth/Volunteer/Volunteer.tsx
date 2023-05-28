import React , { ChangeEvent, FormEvent, useState }from "react";
import "../Auth.css";
import Content from "../../../UI/Content/Content";
import UserDetails from "../../../../utils/interfaces/userDetails";
import { SignUpAction } from "../../../../utils/actions/User.actions";
import { toast } from "react-toastify";


const Volunteer = () => {
  const [userData, setUserData] = useState<UserDetails>({
    type: "volenteer",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

/* @BoazBitton.
  TODO:
  - Please make validitions to userData
  - make sure all the fields are not empty.
  - valid email is correct email meaing with @ char.
  - valid phone number with 10 digits that start with code +972 or start with 054,3,2,0,8
  - please used only with regular expressions.
*/
  const submitHandler = async (event:FormEvent) => {
    event.preventDefault();

    //VALIDTION!!!!!!!!!!!!!!!!

    const data = await SignUpAction(userData);
    if(data.status === 200){
      toast.success(`${data.message}`);
    }else{
      toast.warning(`${data.message}`);
    }



  }
  /*@BoazBitton.
  TODO: 
  - add error message for incorrect input.
  */
  return(
    <Content>
    <div className="volunteer">
      <form className="form" onSubmit={submitHandler}>
        <p className="title">באת לעשות טוב לעולם!</p>
        <p className="message">אנא מלא את הפרטים הבאים </p>
        <div className="flex">
            <label>
              <input
                name="first_name"
                placeholder=""
                type="text"
                className="input"
                onChange={onChangeHandler}
              />
              <span>שם פרטי</span>
            </label>

            <label>
              <input
                placeholder=""
                type="text"
                className="input"
                name="last_name"
                onChange={onChangeHandler}
              />
              <span>שם משפחה</span>
            </label>
          </div>

          <label>
            <input
              placeholder=""
              type="email"
              className="input"
              name="email"
              onChange={onChangeHandler}
            />
            <span>אימייל</span>
          </label>

          <label>
            <input
              placeholder=""
              type="phone"
              className="input"
              name="phone"
              onChange={onChangeHandler}
            />
            <span>מספר פלאפון</span>
          </label>
          <label>
            <input
              placeholder=""
              type="password"
              className="input"
              name="password"
              onChange={onChangeHandler}
            />
            <span>סיסמא</span>
          </label>
          <label>
            <input
              placeholder=""
              type="password"
              className="input"
              name="confirm_password"
              onChange={onChangeHandler}
            />
            <span>אימות סיסמא</span>
          </label>
          <button className="submit">הרשמה</button>
          <p className="signin">
            כבר יש לך משתמש? <a href="#Link">התחברות</a>{" "}
          </p>
      </form>
    </div>

    </Content>

  );
};

export default Volunteer;
