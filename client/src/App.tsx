import Login from './components/Login'
import './styles/_main.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Userdash from './components/Userdash';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChangeName from './components/ChangeName';
import ChangePassword from './components/ChangePassword';
import PrivateRoutes from './utils/PrivateRoutes'
import { APIContextProvider } from './context/DataContext';




function App() {
  
  return (
    <div className='App'>
      <APIContextProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login username={''} password={''} />} />
          <Route path='/register' element={<Register username={''} email={''} password={''} />} />
          <Route path='/' element={<PrivateRoutes />}>
            <Route path='/userdash' element={<Userdash />} />
            <Route path='/change-name' element={<ChangeName />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
          <Route path='/' element={<Navigate to='/userdash' replace />} />
        </Routes>
      </Router>
      </APIContextProvider>
     
    </div>
  )
}

export default App
