import React from 'react';
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const name = localStorage.getItem('name')
  const navigate = useNavigate()
  return (
    <header className="header">
        <h1 className="logo"> 
          <Link to = '/'>BLOG</Link>
        </h1>
        <nav>
            <ul>
              {isLoggedIn ? 
              <span>
                <li><span href="#" className="user-name">Hello, {name}</span></li>
                <li><span onClick={() => {
                  localStorage.removeItem('isLoggedIn')
                  localStorage.removeItem('name')
                  navigate('/')
                }}>Logout</span></li>
                </span> : <span>
                <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/register'>Register</Link></li>
              </span>}

                {/* <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/register'>Register</Link></li>
                <li><span href="#" className="user-name">Hello, Minh Nhat</span></li>
                <li><a href="#">Logout</a></li> */}
            </ul>
        </nav>
    </header>

  )
}
