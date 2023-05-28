import React from 'react'
import classes from './Footer.module.scss';
import Container from '../../UI/Container/Container';
import eyes from '../../../asset/images/eyes.png';
import sce from '../../../asset/images/SCE_logo.png';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.__footer}>
      <Container>
        <div className={classes.__footer_content}>
          <div className={classes.__logos}>

            <div className={classes.__logoWeb}>
              <img src={eyes} alt=''/>
              <span>See Beyond</span>
              <span>Copyright © 2022-{year}</span>
            </div>
            <div className={classes.names}>
              <span>Roni Jack Vituli</span>
              <span>Boaz Bitton</span>
            </div>
            <div className={classes.__logoSCE}>
              <img src={sce} alt=""/>

            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Footer