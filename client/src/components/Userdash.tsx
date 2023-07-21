import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import LogOut from './LogOut'
import DeleteUser from './DeleteUser'
import { useAPI } from '../context/DataContext'

type Props = {}

const Userdash = (props: Props) => {
  const navigate = useNavigate()
  const { user } = useAPI();

    return (
    <div className='Login-div'>
        <button className='button'>Change Password</button>
        <button className='button' onClick={() => navigate("/change-name")}>Change Name</button>
       <DeleteUser />
       <LogOut  />
    </div>
  )
}

export default Userdash


