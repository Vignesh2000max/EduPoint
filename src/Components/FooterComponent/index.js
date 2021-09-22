import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
    <>
        <div className='footer'>  
            <div className='footer__footerLogo'>
                <Link to='/' ><img src='./Logo/logo1.png' alt='LOGO' className='footer__footerLogo--logo'/></Link>
            </div>
            <div className='footer__linkWrap'>
                <ul className='footer__linkWrap__wrap'>
                    <li className='subheading--1 color--black'>Join our community</li>
                    <Link to='' className='footer__linkWrap__wrap__links'>Mentor</Link>
                    <Link to='' className='footer__linkWrap__wrap__links'>Sudent</Link>  
                </ul> 
            </div>
            <div className='footer__socialLinksContainer'>
                <h5 className='subheading--1 color--black'>Follow us</h5>
                <ul className='footer__socialLinksContainer__wrap'>
                    <Link to='' className='footer__socialLinksContainer__wrap__links'><i className='fa fa-facebook fa-lg'></i></Link>
                    <Link to='' className='footer__socialLinksContainer__wrap__links'><i className='fa fa-instagram fa-lg'></i></Link>
                    <Link to='' className='footer__socialLinksContainer__wrap__links'><i className='fa fa-twitter fa-lg'></i></Link>  
                </ul>
            </div>   
        </div>
        <p className='copyright'>Copyright&#169; 2020 EduTech.</p>
    </>
    )
}

export default Footer
