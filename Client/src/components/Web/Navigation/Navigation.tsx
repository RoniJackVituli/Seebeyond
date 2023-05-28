import React from "react";
import classes from "./Navigation.module.scss";
import Container from "../../UI/Container/Container";
import eyes from "../../../asset/images/eyes.png";

const Navigation = () => {
  return (
    <div className={classes.__navigation}>
      <Container>
          <div className={classes.__navbts}>
            <div className={classes.logoWeb}>
              <img src={eyes} alt="" />
              <span>See Beyond</span>
            </div>
            <div className={classes.bts}>
              <span>התחברות</span>
            </div>
          </div>
      </Container>
    </div>
  );
};

export default Navigation;
