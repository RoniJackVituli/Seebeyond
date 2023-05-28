import React, { ChangeEvent, useEffect, useState } from "react";
import Content from "../../../UI/Content/Content";
import "../Auth.css";
import UserDetails from "../../../../utils/interfaces/userDetails";


const Blind = () => {
  const [userData, setUserData] = useState<UserDetails>({
    type: "blind",
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
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Content>
      <div className="volunteer">
        <form className="form">
          <p className="title">אנחנו כאן בשביל לעזור</p>
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

export default Blind;
