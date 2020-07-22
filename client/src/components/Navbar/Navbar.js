import React from 'react'

import { Link } from 'react-router-dom'

import './navbar.scss';

const Navbar = () => {
    return (
        <header>
            <h2>
                <Link to='/'>
                    NOTE
                </Link>
            </h2>
            <nav>
                <ul>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
