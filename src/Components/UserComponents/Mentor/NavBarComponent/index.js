import React from 'react';
import {Link} from 'react-router-dom';

const MentorNav = (props) => {

    const userInfo = props.userAuth;

    const logouthandler = () => {
        props.logout();
    }

    return (
        <div className='header'>
            <div className='header__logo-box'>
                <Link to='/home'><img src='../Logo/logo1.png' className='header__logo' alt='LOGO' /></Link>
            </div>
            <div className='userinfo'>
                <p className='userinfo--userName'>{userInfo.displayName}</p>
                <span className='fa fa-user fa-lg userinfo--defaultuserImg'></span>
                <button className='btn btn--logout' onClick = {logouthandler}>Log out</button>
            </div>
        </div>
    )
}

export default MentorNav