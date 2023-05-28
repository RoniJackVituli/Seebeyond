import React from 'react'
import Content from '../../UI/Content/Content'
import classes from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const navigation = useNavigate();

  const volunteerNavigate = () => {
    navigation('/volunteer-register');
  }
  const blindNavigate = () => {
    navigation('/blind-register');
  }


  return (
      <Content>
        <div className={classes.__home}>
          <div className={classes.__titles}>
            <h1>ברוכים הבאים</h1>
            <h3>רגע לפני שממשיכים אנא תבחרו</h3>
          </div>
          <div className={classes.__btns}>
            <button onClick={volunteerNavigate}>מתנדב</button>
            <button onClick={blindNavigate}>ליקוי ראייה</button>
          </div>
        </div>
      </Content>
  )
}

export default Home