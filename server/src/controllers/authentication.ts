import express from "express"
import { getUserByEmail, createUser, deleteToken, getUserBySessionToken} from "../db/users"
import { authentication, random } from "../helpers"

interface AuthenticatedRequest extends express.Request {
  identity?: {
    _id: string;
    email: string;
  };
}


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body

    if(!email || !password){
      console.log("Provide email or password")
      return res.sendStatus(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
    if(!user) {
      console.log("There is no user with this email. Please Register")
      return res.sendStatus(400)

    }
    const expectedHash = authentication(user.authentication.salt, password)

    if(expectedHash === null || user.authentication.password !== expectedHash){
      console.log("Incorect password")
      return res.status(403).send("Incorrect password")
    }

    const salt = random()
    user.authentication.sessionToken = authentication(salt, user._id.toString())

    await user.save()

    res.cookie('GRZEGORZ_AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

    
    
    return res.status(200).json(user).end()
  }catch(error){
    console.log(error);
    return res.sendStatus(400);

  }
}

export const logout = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
   
    res.clearCookie("GRZEGORZ_AUTH")
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password)
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}