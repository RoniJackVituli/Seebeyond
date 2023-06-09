import Content from "../../UI/Content/Content";
import classes from "./Blind.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import {
  FindNextVolunteer,
  findVolunteer,
  cancelVolunteering,
} from "../../../utils/actions/User.actions";
import { useState } from "react";
import Review from "../../Web/Review/Review";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
const PROCESSMSG: string = "אנחנו מחפשים לך מתנדב אנא המתן";
const ERRMSG: string = "לא מצאנו לך מתנדב לחץ שוב על הכפתור לניסיון נוסף";
const ABORTMSG:string = "בקשת ההתנדבות בוטלה נשמח לעזור לך בכל עת שוב";
// first_name:'בועז',last_name:"ביטון",phone:'0526203790',email:'Boaz2119@gmail.com'
const BlindPage = () => {
  const email = useSelector((state: RootState) => state.user.user!.email);
  const [volunteer, setVolunteer] = useState<any>({});
  const [handle, setHandle] = useState<boolean>(false);

  const proccesHandler = async () => {
    speakerHandler(PROCESSMSG);
    const response = await findVolunteer(email);
    if (response.status === 200) {
      const { volunteer } = response.data;
      const { first_name, last_name, phone } = volunteer;
      const [num1, num2, num3, num4] = String(phone.slice(-4)).split("");

      const READYMSG: string = `מצאנו לך מתנדב בשם ${first_name} ${last_name} שאמור ליצור איתך קשר בדקות הקרובות במספר שמסתיים בספרות ${num1} ${num2} ${num3} ${num4}`;

      speakerHandler(READYMSG);
      setVolunteer(volunteer);
    } else speakerHandler(ERRMSG);
  };

  const speakerHandler = (text: string) => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "he-IL";
      utterance.rate = 0.8;
      synthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };

  const nextVolunteer = async () => {
    speakerHandler(PROCESSMSG);
    const response = await FindNextVolunteer(volunteer.email, email);
    if (response.status === 200) {
      const { volunteer } = response.data;
      const { first_name, last_name, phone} = volunteer;
      const [num1, num2, num3, num4] = String(phone.slice(-4)).split("");

      const READYMSG: string = `מצאנו לך מתנדב בשם ${first_name} ${last_name} שאמור ליצור איתך קשר בדקות הקרובות במספר שמסתיים בספרות ${num1} ${num2} ${num3} ${num4}`;

      speakerHandler(READYMSG);
      setVolunteer(volunteer);
    } else {
      const READYMSG: string = `לא נמצא מתנדב כעת, אנא נסה שנית במועד מאוחר יותר.`;
      speakerHandler(READYMSG);
    }
  };
  const cancelVolunteer = async () => {
    if (volunteer){
      speakerHandler(ABORTMSG);
      const response = await cancelVolunteering(volunteer.email,email);
      if (response.status === 200) {
        setVolunteer({});
        setHandle(false);
      }
      else{
        toast.warning(response.message)
      
      }
      
    }


    
  }
  
  return (
    <Content>
      <div className={`${classes.__blind_container}`}>
        {Object.keys(volunteer).length === 0 && !handle && (
          <div className={classes.__askforhelp}>
            <h1 onClick={proccesHandler}>אני צריך עזרה</h1>
          </div>
        )}
        {Object.keys(volunteer).length > 0 && !handle && (
          <div className={classes.__contant}>
            <h1>
              המתנדב/ת {volunteer.first_name} {volunteer.last_name}
            </h1>
            <p>יצור איתך קשר בקרוב!</p>
            <p>
              במספר שמסתיים בספרות {String(volunteer.phone.slice(-4)).split("")}
            </p>

            <div className={classes.__btns}>
              <button
                onClick={() => {
                  setHandle(true);
                }}
              >
                טופל
              </button>
              <button onClick={nextVolunteer}>רוצה מישהו/י אחר/ת</button>
              <button onClick={cancelVolunteer}>בטל</button>
            </div>

            <div className={classes.__reviews}>

              {volunteer.reviews && volunteer.reviews?.length > 0 &&  
              <>
                <h1 className={classes.title}>ביקורות על {volunteer.first_name} {volunteer.last_name}</h1>
                <>
                {volunteer.reviews.map((review:any) => {
                return <div className={classes.__content}>
                  <h1>{review.title}</h1>
                  <p>{review.content}</p>
                  <ReactStars value={review.rate}/>
                </div>
              
                })}
                </>
              </>
              }
            </div>
          </div>
        )}

        {handle && <Review user={volunteer}/>}
      </div>
    </Content>
  );
};

export default BlindPage;
