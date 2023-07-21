import React, { useMemo, useState } from 'react'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import '../styles/_main.scss'
import { debounce } from 'lodash';
import Cookies from 'js-cookie';

type Props = {
  username: string,
  password: string
}

const Login = (props: Props) => {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password:""
  })

  const {email, password} = loginData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData)
  };
  
  
  const memoizedFormData = useMemo(() => loginData, [loginData]);
  const handleInputChangeDebounced = debounce(onChange, 500);
  

  const Login = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    const data = { email: loginData.email, password: loginData.password };

    try{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data)
      if(!email || !password ) {
        console.log("Provide data")
      }

      if(!password ) {
        console.log("Provide password")
      }

      const res = await axios.post('http://localhost:8000/auth/login', data, config);
      Cookies.set("GRZEGORZ_AUTH", res.data.authentication.sessionToken, { domain: "localhost", path: "/" });
      console.log(res.data.authentication.sessionToken)
      localStorage.setItem("userId", res.data._id)
      sessionStorage.setItem("sessionToken", res.data.authentication.sessionToken)
      navigate("/userdash");
    }catch(Error){
      console.log(Error)

    }
    
    
    
  }
  return (
    <form onSubmit={Login} className='Login-div'>
        <h1>Login</h1>
        <div className='formDiv'>
            <input type="text" name='email' placeholder='Email' className='formInput' onChange={handleInputChangeDebounced}/>
            <HiMail className='icon' />
        </div>
        <div className='formDiv'>
        <input type="password" name='password' placeholder='Password' className='formInput' onChange={handleInputChangeDebounced} />
            <HiLockClosed className='icon' />
        </div>
        
        <div className='passwordOptions'>
            <div>
            <input type="checkbox" id='remember' name='Remember me!' className='checkbox' />
            <label htmlFor="remember" className='rememberMe'>Remember Me!</label>
            </div>
            <a href="" className='forgotPassword'>Forgot password?</a>
        </div>
        <button className='button'>Login</button>
        <p className='registerOption'>Don't have account? <a href="/register" className='Register'>Register!</a></p>
        

    </form>
  )
}

export default Login