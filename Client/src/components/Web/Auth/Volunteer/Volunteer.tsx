import React, { ChangeEvent, FormEvent, useState } from "react";
import "../Auth.css";
import Content from "../../../UI/Content/Content";
import UserDetails from "../../../../utils/interfaces/userDetails";
import { SignUpAction } from "../../../../utils/actions/User.actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ValidateFields,
  ValidateEmail,
  ValidatePhone,
  ValidatePassword,
} from "../../../../utils/function/ValidateData";

const Volunteer = () => {
  const navigation = useNavigate();
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

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const data = await SignUpAction(userData);
    if (data.status === 200) {
      toast.success(`${data.message}`);
      navigation("/home");
    } else {
      toast.warning(`${data.message}`);
    }
  };
  const isFormValid = () => {
    return (
      !ValidateFields(userData) ||
      !ValidateEmail(userData.email) ||
      !ValidatePhone(userData.phone) ||
      !ValidatePassword(userData.password, userData.confirm_password)
    );
  };

  return (
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
              style={
                userData.email && !ValidateEmail(userData.email)
                  ? { borderColor: "red" }
                  : {}
              }
              placeholder=""
              type="email"
              className="input"
              name="email"
              onChange={onChangeHandler}
            />
            {userData.email && !ValidateEmail(userData.email) ? (
              <span style={{ color: "red" }}>הכנס אימייל חוקי</span>
            ) : (
              <span>אימייל</span>
            )}
          </label>

          <label>
            <input
              style={
                userData.phone && !ValidatePhone(userData.phone)
                  ? { borderColor: "red" }
                  : {}
              }
              placeholder=""
              type="phone"
              className="input"
              name="phone"
              onChange={onChangeHandler}
            />
            {userData.phone && !ValidatePhone(userData.phone) ? (
              <span style={{ color: "red" }}>הכנס פלאפון חוקי</span>
            ) : (
              <span>פלאפון</span>
            )}
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
              style={
                userData.password && userData.confirm_password &&!ValidatePassword(userData.password,userData.confirm_password)
                  ? { borderColor: "red" }
                  : {}
              }
              placeholder=""
              type="password"
              className="input"
              name="confirm_password"
              onChange={onChangeHandler}
            />
            {userData.password &&userData.confirm_password &&  !ValidatePassword(userData.password,userData.confirm_password) ? (
              <span style={{ color: "red" }}>הסיסמאות אינן תואמות</span>
            ) : (
              <span>אימות סיסמא</span>
            )}
          </label>
          <button disabled={isFormValid()} className="submit">
            הרשמה
          </button>
          <p className="signin">
            כבר יש לך משתמש? <a href="#Link">התחברות</a>{" "}
          </p>
        </form>
      </div>
    </Content>
  );
};

export default Volunteer;
