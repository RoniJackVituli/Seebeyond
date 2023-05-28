import React from 'react'
import classes from './Container.module.scss';

type ContainerProps = {
  children: React.ReactNode;
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className={classes.__container}>
      {children}
    </div>
  )
}

export default Container