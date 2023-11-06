import React from 'react'
import '../css/Menu.css'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <section className="menu">
    <nav>
        <ul className="main-nav">
            <button className="menu-buton">
            <li><Link to = '/'>HOME</Link></li>
            </button>
            <button className="menu-buton">
                <li><Link to = '/news'>NEWS</Link></li>
            </button>
            <button className="menu-buton">
            <li><Link to = '/status'>POSTS</Link></li>
            </button>
        </ul>
    </nav>
</section>
  )
}
