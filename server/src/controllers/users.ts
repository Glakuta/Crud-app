import express from 'express'
import { getUsers, deleteUserById, updateUserById, getUserById, updatePasswordById } from '../db/users'


interface AuthenticatedRequest extends express.Request {
  identity?: {
    _id: string;
    email: string;
  };
}

export const getAllUsers =  async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers()
        return res.status(200).send(users);

    }catch(error){
        console.log(error)
        return res.status(400)

    }
}

export const getLoggedUser = async (req: AuthenticatedRequest, res: express.Response,  next: express.NextFunction ) => {
  
  const {id} = req.params;
  try{
    const user = await getUserById(id);
        return res.status(200).send(user);

  }catch(error){
    console.log(error)
    return res.status(400)
  }
}

export const updatePassword = async (req: express.Request, res: express.Response) => {
  try{
    const {id} = req.params;
    const {password} = req.params

    if (!password) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id)

    user.authentication.password = password

    await user.save();
  
    return res.status(200).json(user);



  }catch(error){
    console.log(error)
    return res.status(400)
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const deleteUser = await deleteUserById(id)

        return res.json(deleteUser)


    }catch(error){
        console.log(error)
        return res.status(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;
  
      if (!username) {
        return res.sendStatus(400);
      }
  
      const user = await getUserById(id);
      
      user.username = username;
      await user.save();
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }