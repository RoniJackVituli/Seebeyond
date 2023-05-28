import React from 'react'
import Content from '../../UI/Content/Content'
import classes from './Blind.module.scss';
const BlindPage = () => {
  return (
    <Content>
      <div className={classes.__blind_container}>
        <div className={classes.__askforhelp}>
          <h1>אני צריך עזרה</h1>
        </div>
      </div>
    </Content>
  )
}

export default BlindPage