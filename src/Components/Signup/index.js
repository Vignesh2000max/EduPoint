import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = (props) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [hasError, setHasError] = useState(true);

    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [conPassError, setConPassError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorClass, setErrorClass] = useState('');

    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


    const validateUserName = () => {
        if(!userName || userName.length < 6 || userName.length > 15)
        {
            setHasError(true);
            setErrorClass('');
            setUserNameError('User name length should be between 6 to 15');
        }
        else
        {
            setHasError(false);
            setErrorClass('');
            setUserNameError('');
        }
    }

    const validateEmail = () => {
        if(!email || email.length === 0 || !emailPattern.test(email))
        {
            setHasError(true);
            setErrorClass('fieldError');
            setEmailError('Email not valid');
        }
        else
        {
            setHasError(false);
            setErrorClass('');
            setEmailError('');
        }
    }

    const validatePassword = () => {
        if(!password || password.length < 8 || password.length > 15)
        {
            setHasError(true);
            setErrorClass('fieldError');
            setPasswordError('Weak password');
        }
        else
        {
            setHasError(false);
            setErrorClass('');
            setPasswordError('');
        }
    }

    const validateConPass = () => {
        if(!conPassword || conPassword !== password)
        {
            setHasError(true);
            setErrorClass('fieldError');
            setConPassError('Password does not match');
        }
        else
        {
            setHasError(false);
            setErrorClass('');
            setConPassError('');
        }
    }

    const handleNormalSignup = event => {
        props.signupUser({username: userName, password: password, usertype: props.user, email: email});
        event.preventDefault();
    }

    const handleGoogleSignup = event => {
        props.googleSignup({usertype: props.user});
        event.preventDefault();
    }

    return (
        <>
        <div className='signup'>
            <div className='signup__infoContainer'>
                <button onClick = {handleGoogleSignup}  className='btn__sign--google'><span className="fa fa-google fa-lg"></span>&nbsp;&nbsp; Signup with Google</button>
                <form className='signup__infoContainer__form' onSubmit={handleNormalSignup}>
                    <span>
                        <label htmlFor='username' >UserName</label>
                        <input type='text' onBlur = {validateUserName} name='userName' id='username' onChange={event => setUserName(event.target.value)} placeholder='Naruto'/>  
                    </span>
                        { (userNameError != null) ? 
                                <p className = {errorClass}>{userNameError}</p>:<p></p>
                        }
                    <span>
                        <label htmlFor = 'email' >Email</label>
                        <input type='email' onBlur = {validateEmail} name='Email' id='email' onChange={event => setEmail(event.target.value)} placeholder='Naruto@gmail.com'/>
                    </span>
                        { (emailError != null) ? 
                                <p className = {errorClass}>{emailError}</p>:<p></p>
                        }
                    <span>
                        <label htmlFor='password' >Password</label>
                        <input type='password' onBlur = {validatePassword} name='pass' id='password' onChange={event => setPassword(event.target.value)} placeholder=''/>     
                    </span>
                        { (passwordError != null) ? 
                                <p className = {errorClass}>{passwordError}</p>:<p></p>
                        }
                    <span>
                        <label htmlFor='conPass'>Confirm Password</label>
                        <input type='password' onBlur = {validateConPass} name='confirmPassword' id='conPass' onChange={event => setConPassword(event.target.value)} placeholder=''/>
                    </span>
                        { (conPassError != null) ? 
                                <p className = {errorClass}>{conPassError}</p>:<p></p>
                        }
                    <button disabled = {hasError} type='submit' name='Signup' className='btn__sign'>Signup</button>
                </form>
                <Link to='/login' className='loginLink'>already have account login.</Link>
            </div>
        </div>
        </>
    )
}

export default Signup
