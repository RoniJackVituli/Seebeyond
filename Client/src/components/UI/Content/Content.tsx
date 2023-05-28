import React from 'react'
import classes from './Content.module.scss';

type ContentProps = {
  children: React.ReactNode;
  className?:string
}



const Content = ({children, className}:ContentProps) => {
  return (
    <div className={`${classes.__content} ${className}`}>
      {children}
    </div>
  )
}

export default Content