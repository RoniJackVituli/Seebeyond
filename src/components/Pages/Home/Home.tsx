import React from 'react'
import Content from '../../UI/Content/Content'
import classes from './Home.module.scss';
const Home = () => {
  return (
      <Content>
        <div className={classes.__home}>
          <div className={classes.__titles}>
            <h1 style={{fontSize:'100px'}}>ברוכים הבאים</h1>
            <h3>רגע לפני שממשיכים אנא תבחרו</h3>
          </div>
          <div>
            <button>מתנדב</button>
            <button>ליקוי ראייה</button>
          </div>
        </div>
      </Content>
  )
}

export default Home