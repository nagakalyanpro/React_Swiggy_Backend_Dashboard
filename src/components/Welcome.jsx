import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      <div className='navSection'>
    <Link to='/' className="link">
    <div className="title">
            Vendor Dashboard
        </div>
    </Link>
      
    </div>
      <div className="subject">
      <h2>Welcome to Ruby</h2>
      <div className='partner'>Become a Partner with Ruby</div>
      <div className="welAuth">
        <Link to='/login'>
        <div >
          <p>already registered?</p>
          <button>
          Login
          </button>
        </div>
        </Link>
        <Link to='/register'>
        <div >
          <p>don't have an Account?</p>
          <button>
          Register
          </button>
        </div>
        </Link>

      </div>

      </div>
    </>
  )
}

export default Welcome