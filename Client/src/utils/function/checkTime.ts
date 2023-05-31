const checkTime = (): boolean => {
    const expirationTime = localStorage.getItem("time");
    const currentTime = new Date().getTime();
    if (expirationTime && currentTime > +expirationTime) {
      localStorage.removeItem("user");
      localStorage.removeItem("time");
      return false;
    } else {
      return true;
    }
  };
  
  export default checkTime;
  