import React from "react";
import Content from "../../UI/Content/Content";
import classes from './Volunteer.module.scss';
import earth from '../../../asset/images/earth.png';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Review from "../../Web/Review/Review";

const VolunteerPage = () => {
  const blind = useSelector((state: RootState) => state.user.user?.blind);
  

  return (
    <Content>
      <div className={classes.__volunteer_container}>
       {!blind && <div className={classes.__datavolunteer}>
          <img src={earth} alt="earth"/>
          <div className={classes.__data}>
            <div className={classes.__check}>
              <span>מתנדבים</span>
              <span>1434</span>
            </div>
            <div className={classes.__check}>
              <span>זקוקים לעזרה</span>
              <span>233</span>
            </div>
          </div>
        </div>}
      {blind && 
        <Review user={blind}/>
      }
      </div>
    </Content>
  );
};

export default VolunteerPage;
