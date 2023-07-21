import React from 'react'
import { useAPI } from '../context/DataContext'
import { APIContextProps } from '../context/DataContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Props = {
  user: { id: string };
};

const DeleteUser = () => {
  const { user, sessionToken} = useAPI();
  const navigate = useNavigate()

  const deleteUser = async () => {
    console.log(user)
    try {
      axios.delete(`http://localhost:8000/users/${user._id}`, {
        headers: {
          "currentUserId": user._id,
          "existingUser": sessionToken,
          
          
      },
      withCredentials: true
      })
      navigate("/register")
      localStorage.clear()
      sessionStorage.clear()
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className='button' onClick={deleteUser}>Delete user</button>
  )
}

export default DeleteUser