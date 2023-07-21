import axios from 'axios'
import React, { useState } from 'react'
import { useAPI } from '../context/DataContext';

type Props = {}

const ChangeName = (props: Props) => {
  const { user, sessionToken } = useAPI();
  const [newUsername, setNewUsername] = useState("");

  const changeUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:8000/users/${user._id}`,
        { username: newUsername },
        {
          headers: {
            "currentUserId": user._id,
            "existingUser": sessionToken,
          },
          withCredentials: true
        }
      );

      setNewUsername("");
      alert("Your username has been changed!");
    } catch (err) {
      console.log("Something went wrong", err as Error);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value)
  }

  return (
    <form onSubmit={changeUsername} className="LoginDiv">
      <div className='formDiv'>
        <input type="text" name='username' placeholder='Username' className='formInput' onChange={handleUserNameChange} />
      </div>
      <button className='button' type="submit">Change Name</button>
    </form>
  )
}

export default ChangeName