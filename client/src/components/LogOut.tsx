import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

type Props = {}

const LogOut = (props: Props) => {
    const navigate = useNavigate()

    const LogOut = () => {
        try{
            const sessionCookie = Cookies.get('session');
            console.log(sessionCookie)
            const authToken: any = Cookies.get("GRZEGORZ_AUTH");
            axios.post("http://localhost:8000/auth/logout")
               .then(() => {
               Cookies.remove("GRZEGORZ_AUTH", { path: '' })
               localStorage.clear()
               navigate("/login")
        })
        }catch(error){
            console.log(error)
        }
    }


  return (
    <div>
        <button className='button' onClick={LogOut}>Log out</button>
    </div>
  )
}

export default LogOut