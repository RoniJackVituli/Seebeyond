import React from "react";
import classes from "./Navigation.module.scss";
import Container from "../../UI/Container/Container";
import eyes from "../../../asset/images/eyes.png";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigation = useNavigate();

  const navigateToLoginHandler = () =>{
      navigation('/login');
  }
  return (
    <div className={classes.__navigation}>
      <Container>
          <div className={classes.__navbts}>
            <div className={classes.logoWeb} style={{cursor:'pointer'}} onClick={()=>{
              return navigation('/home')
            }}>
              <img src={eyes} alt="" />
              <span>See Beyond</span>
            </div>
            <div className={classes.bts}>
              <span onClick={navigateToLoginHandler}>התחברות</span>
            </div>
          </div>
      </Container>
    </div>
  );
};

export default Navigation;
