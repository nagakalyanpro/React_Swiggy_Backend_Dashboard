import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div>
        <div className='navSection'>
        <div className="title">
            Vendor Dashboard
        </div>
        <div className="company"></div>
        <div className="user">
            <Link to='/login'>
          <span>Login /</span>
            </Link>
            <Link to= '/register'>
          <span> SignUp</span>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Auth