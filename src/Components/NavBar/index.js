import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {

    const studentUser = "student";
    const mentorUser = "mentor";
 
    return (
      
        <div className='header'>
            <div className='header__logo-box'>
                <Link to='/home'><img src='./Logo/logo1.png' className='header__logo' alt='LOGO' /></Link>
            </div>
            <div className='header__NavList'>
                <Link to={`/signup/${studentUser}`} className='header__NavList-NavLink' >Student</Link>
                <Link to={`/signup/${mentorUser}`} className='header__NavList-NavLink' >Mentor</Link>
            </div>
            <button className='header__btn'>
                <Link className='header__btn-link' to='/login'>Sign in</Link>
            </button>
        </div>
    )
}

export default Nav
