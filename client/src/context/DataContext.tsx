import React, { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

interface ContextProps {
  children: ReactNode,
}

export interface APIContextProps {
  user: {
    _id: string;
    username: string;
  };
  sessionToken: string;
}

const APIContext = createContext<APIContextProps>({ user: { _id: '', username: ''}, sessionToken: ''});

export const APIContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<{ _id: any, sessionToken: any, username: string }>({ _id: '', username:'', sessionToken: '' });
  const id = localStorage.getItem("userId");
  const sessionToken = sessionStorage.getItem("sessionToken")

  

  useEffect(() => {
    axios.get(`http://localhost:8000/users/logged-user/${id}`, {
        headers: {
          "currentUserId": id,
          "existingUser": sessionToken,
          
      },
      withCredentials: true
      })
      .then(response => {
        setUser({
          _id: id,
          username: response.data.username,
          sessionToken: sessionToken
        });
        
      })
      .catch(error => {
        console.error(error)
      })
  }, [id])
  

  return (
    <APIContext.Provider value={{ user: { _id: user._id, username: user.username }, sessionToken: user.sessionToken }}>



      {children}
    </APIContext.Provider>
  );
};

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}