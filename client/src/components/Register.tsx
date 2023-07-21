import React, { ReactElement, ReactEventHandler, useMemo, useRef, useState } from 'react'
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi'
import axios from 'axios'
import { debounce } from 'lodash';
import '../styles/_main.scss'
import { useNavigate } from 'react-router-dom';

type Props = {
  username: string,
  email: string,
  password: string
}

const Register = (props: Props) => {
 const [formData, setFormData] = useState({
  email:"",
  password:"",
  username:""
 })

 const navigate = useNavigate()

//const formDataRef = useRef(formData);

const {email, password, username} = formData

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target);
  setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData)
};


const memoizedFormData = useMemo(() => formData, [formData]);
const handleInputChangeDebounced = debounce(onChange, 500);


const registerUser = async (e:React.SyntheticEvent) => {
  e.preventDefault()
  const data = { email: formData.email, password: formData.password, username: formData.username };
  try{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data)
    if(!email || !password || !username) {
      console.log("Provide data")
    }
    console.log(data)
    await axios.post('http://localhost:8000/auth/register', data, config);
    navigate("/login")

    

  }catch(err){
    console.log("Something went wrong")
  }
}



  return (
    <form onSubmit={registerUser} className='Login-div'>
    <h1>Register</h1>
    <div className='formDiv'>
        <input type="text" placeholder='Username' name="username" className='formInput' defaultValue={username} onChange={handleInputChangeDebounced}  />
        <HiUser className='icon' />
    </div>
    <div className='formDiv'>
        <input type="text" placeholder='Email' name="email" className='formInput' defaultValue={email} onChange={handleInputChangeDebounced}  />
        <HiMail className='icon' />
    </div>
    <div className='formDiv'>
    <input type="password" placeholder='Password' name='password' className='formInput' defaultValue={password} onChange={handleInputChangeDebounced}  />
        <HiLockClosed className='icon' />
    </div>
    
    <button className='button'>Register</button>
    <p className='registerOption'>Do you have account? <a href="/login" className='Register'>Login!</a></p>
    </form>
  )
}

export default Register