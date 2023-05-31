import React , { useState , ChangeEvent , FormEvent} from "react";
import "./Login.css";
import Content from "../../../UI/Content/Content";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../utils/actions/User.actions";
import { useDispatch } from "react-redux";
import LoginData from "../../../../utils/interfaces/LoginData";
import { toast } from "react-toastify";



const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const volunteerNavigate = () => {
    return navigate('/volunteer-register');
  }
  
  const blindNavigate = () => {
    return navigate('/blind-register');
  }
  const [loginData , setLoginData] = useState<LoginData>({email:'',password:''})
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target;
    setLoginData({...loginData , [name]:value})
  }

  // const checkFields = () =>{
  //   return true
  //   // return !loginData.email || !loginData.password;
  // }
  const submitHandler = async (e:FormEvent) =>{
    e.preventDefault();
    const response = await getUserInfo(loginData,dispatch)
    if (response.status===200){
      toast.success('Logged in Successfully')
      return navigate(`/home`)
    }
    setError(response.message);
  }


  return (
    <Content>
      <div className="login">

      <form onSubmit={submitHandler} className="form-login">
        <p className="form-title">התחברות</p>
        <div className="input-container">
          <input name="email" onChange={onChangeHandler} placeholder="הכנס מייל" type="email" />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input name="password" onChange={onChangeHandler} placeholder="הכנס סיסמא" type="password" />

          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button  className="submit" type="submit">
          התחברות
        </button>

        <p className="signup-link">
          No account?
          <div>
          <span onClick={volunteerNavigate}>מתנדב</span>
          <span onClick={blindNavigate}>עיוור</span>
          </div>
        </p>
        {error && <p style={{color:'red', textAlign:'center'}}>
          {error}
          </p>}
      </form>
      </div>

      </Content>
  );
};

export default Login;
