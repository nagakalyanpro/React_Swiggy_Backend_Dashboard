import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import PageNotFound from './components/PageNotFound';

const App = () => {
    const [showAuth, setShowAuth] = useState(true)

    const authToken = localStorage.getItem('loginToken');

  const isAuthenticated = ()=>{
      setShowAuth(false)
  }

  useEffect(()=>{
    if(authToken){
      isAuthenticated()
      console.log("auth is called");
    }
  },[authToken])


  return (
    <Routes>
      <Route path='/' element= {<Welcome />} />
      {!showAuth && 
      <Route path='/dashboard' element={<NavBar />} />
    }
      {showAuth && 
     <>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element= {<Register />} />
     
     </>
    }
    </Routes>
  )
}

export default App
