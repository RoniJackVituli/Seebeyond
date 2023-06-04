import React, { ChangeEvent, FormEvent, useState } from "react";
import classes from "./Review.module.scss";
import ReactStars from "react-stars";
import { RateVolunteer } from "../../../utils/actions/User.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {
  user: any;
};

const Review = ({ user }: Props) => {
  const dispatch = useDispatch();
  const correct_user = useSelector((state :RootState)=> state.user.user);

  const [rate, setRate] = useState<{
    rate: number;
    title: string;
    message: string;
  }>({
    rate: 0,
    title: "",
    message: "",
  });
  const ratingChanged = (newRating: number) => {
    setRate((prev) => {
      return { ...prev, rate: newRating };
    });
  };

  const sendRate = async (event: FormEvent) => {
    event.preventDefault();

    if (rate.rate === 0 || !rate.message || !rate.title) {
      return;
    }

    const response = await RateVolunteer(dispatch, correct_user,rate, user);

    if (response.status === 200) {
      speakerHandler("תודה על הביקורת!");
      window.location.reload();
    }
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

  const titleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setRate((prev) => {
      return { ...prev, title: value };
    });
  };
  const messageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setRate((prev) => {
      return { ...prev, message: value };
    });
  };
  return (
    <div className={classes.__review}>
      <h1>
        מה דעתך על {user.first_name} {user.last_name}
      </h1>
      <div>
        <ReactStars value={rate.rate} onChange={ratingChanged} size={50} />
      </div>
      <form onSubmit={sendRate}>
        <label>כותרת</label>
        <input onChange={titleChange} type="text" />
        <label>חשוב לנו לשמוע את דעתך!</label>
        <textarea onChange={messageChange} required={true} />
        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default Review;
