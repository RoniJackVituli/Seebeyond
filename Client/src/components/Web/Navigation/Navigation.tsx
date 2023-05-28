import React from "react";
import classes from "./Navigation.module.scss";
import Container from "../../UI/Container/Container";
import eyes from "../../../asset/images/eyes.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserAction } from "../../../store/User/User-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const navigateToLoginHandler = () => {
    navigation("/login");
  };
  return (
    <div className={classes.__navigation}>
      <Container>
        <div className={classes.__navbts}>
          <div
            className={classes.logoWeb}
            style={{ cursor: "pointer" }}
            onClick={() => {
              return navigation("/home");
            }}
          >
            <img src={eyes} alt="" />
            <span>See Beyond</span>
          </div>
          <div className={classes.bts}>
            {!user ? (
              <span onClick={navigateToLoginHandler}>התחברות</span>
            ) : (
              <div className={classes.__logged}>
                <span>שלום {`${user.first_name} ${user.last_name}`}</span>
                <span
                  onClick={() => {
                    dispatch(UserAction.clearUser());
                    navigation("/home");
                  }}
                >
                  התנתק
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
