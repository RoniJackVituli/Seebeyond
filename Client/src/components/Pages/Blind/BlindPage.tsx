import Content from "../../UI/Content/Content";
import classes from "./Blind.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { findVolunteer } from '../../../utils/actions/User.actions'
const PROCESSMSG: string = "אנחנו מחפשים לך מתנדב אנא המתן";
const READYMSG: string = "מצאנו לך מתנדב הוא אמור ליצור איתך קשר תוך שלוש דקות";
const ERRMSG: string = "לא מצאנו לך מתנדב לחץ שוב על הכפתור לניסיון נוסף";
const BlindPage = () => {
  const email = useSelector((state:RootState) =>state.user.user!.email)
  

  const proccesHandler = async () =>{
    speakerHandler(PROCESSMSG);
    const response = await findVolunteer(email)
    if (response.status===200) speakerHandler(READYMSG)
    else speakerHandler(ERRMSG)
  
  }

  const speakerHandler = (text:string) => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "he-IL";
      synthesis.speak(utterance);
    } else {
      console.error("Text-to-speech is not supported in this browser.");
    }
  };
  return (
    <Content>
      <div className={classes.__blind_container}>
        <div className={classes.__askforhelp}>
          <h1
            onClick={proccesHandler}>
            אני צריך עזרה
          </h1>
        </div>
      </div>
    </Content>
  );
};

export default BlindPage;
