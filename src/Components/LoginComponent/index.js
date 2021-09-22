import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [errorCss, setErrorCss] = useState('');
    const [hasError, setHasError] = useState('');

    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const validateEmail = () => {
        if(!email || email.length === 0 || !emailPattern.test(email))
        {
            setHasError(true);
            setErrorCss('fieldError');
            setEmailError('Email not valid');
        }
        else
        {
            setHasError(false);
            setErrorCss('');
            setEmailError('');
        }
    }

    const validatePassword = () => {
        if(!password || password.length < 8 || password.length > 15)
        {
            setHasError(true);
            setErrorCss('fieldError');
            setPassError('Weak password');
        }
        else
        {
            setHasError(false);
            setErrorCss('');
            setPassError('');
        }
    }

    const handleLogin = event => {
        props.loginUser({email: email, password: password});
        event.preventDefault();
    }

    const handleGoogleSignup = event => {
        props.googleLogin();
        event.preventDefault();
    }

    return (
        <div className='login'>
            <div className='loginContainer'>
            <button onClick = {handleGoogleSignup}  className='btn__sign--google'>
                <i className="fa fa-google fa-lg"></i>&nbsp; Signin with Google</button>
                <form className='' onSubmit = {handleLogin}>
                    <span>
                        <label htmlFor='email'>Email</label>
                        <input type='text' onBlur = {validateEmail} className='' name='email' id='email' placeholder='abc@gmail.com' onChange = {event => (setEmail(event.target.value))}/> 
                    </span>
                    { (emailError != null) ? 
                                <p className = {errorCss}>{emailError}</p>:<p></p>
                        }
                    <span>
                        <label htmlFor='password'>Password</label>
                        <input type='password' onBlur = {validatePassword} className='' name='password' id='password' onChange = {event => (setPassword(event.target.value))}/>
                    </span>
                    { (passError != null) ? 
                                <p className = {errorCss}>{passError}</p>:<p></p>
                        }
                    <button className='btn__sign' disabled = {hasError}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
