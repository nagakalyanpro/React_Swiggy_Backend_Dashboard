import React, {useState, useEffect} from 'react'
import SideBar from './SideBar'
import Login from './Login'
import Register from './Register'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const vendorName = localStorage.getItem('vendor');
  const firmName = localStorage.getItem('firmName');

const loginHandler = ()=>{
  setShowLogin(true);
  setShowRegister(false);
}
const registerHandler = ()=>{
  setShowLogin(false);
  setShowRegister(true);
}

const logOutHandler =()=>{
    localStorage.removeItem('loginToken')
    localStorage.removeItem('vendorName');
    localStorage.removeItem('firmId');
    localStorage.removeItem('vendor');
    localStorage.removeItem('firmName');
    confirm("Are you sure, you want to log-out?");
    navigate('/')
    window.location.reload();

}

useEffect(()=>{
  const handleBeforeUnload =() =>{
    localStorage.removeItem('loginToken')
    localStorage.removeItem('vendorName');
    localStorage.removeItem('firmId');
    localStorage.removeItem('vendor');
    localStorage.removeItem('firmName');
  }
window.addEventListener('beforeunload', handleBeforeUnload);

return () =>{
  window.removeEventListener('beforeunload', handleBeforeUnload);
}
}, []);

  return (
    <>
    <div className='navSection'>
    <Link to='/dashboard' className="link">
    <div className="title">
            Vendor Dashboard
        </div>
    </Link>
        <div className="company">
          <div className='vendorName'>
            Vendor:
            <span>
             {vendorName}
            </span>
          </div>
          <div className='vendorName'>
            Firm: 
            <span>
            {firmName}
            </span>
          </div>
        </div>
        <div className="user"
          onClick={logOutHandler}
        >
          LogOut
        </div>
    </div>
   <div className="auth-collection">
    <SideBar />
    {showLogin && <Login />}
      {showRegister && <Register />}
   
   </div>
    
    </>
  )
}

export default NavBar