import React from "react";
import "../Auth.css";
import Content from "../../../UI/Content/Content";
const Volunteer = () => {
  return (
    <Content>
    <div className="volunteer">
      <form className="form">
        <p className="title">באת לעשות טוב לעולם!</p>
        <p className="message">אנא מלא את הפרטים הבאים </p>
        <div className="flex">
          <label>
            <input placeholder="" type="text" className="input" />
            <span>שם פרטי</span>
          </label>

          <label>
            <input placeholder="" type="text" className="input" />
            <span>שם משפחה</span>
          </label>
        </div>

        <label>
          <input placeholder="" type="email" className="input" />
          <span>אימייל</span>
        </label>

        <label>
          <input placeholder="" type="phone" className="input" />
          <span>מספר פלאפון</span>
        </label>
        <label>
          <input placeholder="" type="password" className="input" />
          <span>סיסמא</span>
        </label>
        <label>
          <input placeholder="" type="password" className="input" />
          <span>אימות סיסמא</span>
        </label>
        <button className="submit">הרשמה</button>
        <p className="signin">
          כבר יש לך משתמש? <a href="#">התחברות</a>{" "}
        </p>
      </form>
    </div>

    </Content>

  );
};

export default Volunteer;
