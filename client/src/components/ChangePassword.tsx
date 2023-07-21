import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Props = {}

const ChangePassword = (props: Props) => {
  useEffect(()=>{
    axios.get(`http://localhost:8000/users`).then((response) => {
      response.data.forEach((user: { _id: string; password: string }) => {
        console.log(user._id);
        const userId = user._id
        const userPassword = user.password
      });
    });
  }, [])

    

    const [newPassword, setNewPassword] = useState('')

    const changePassword = (e:React.SyntheticEvent) => {
      e.preventDefault()
      

    }
  return (
    <form onSubmit={changePassword} className="LoginDiv">
        <div className='formDiv'>
        <input type="text" placeholder='Username' className='formInput' onChange={() => setNewPassword} />
        </div>
        <button className='button'>Login</button>
    </form>
  )
}

export default ChangePassword