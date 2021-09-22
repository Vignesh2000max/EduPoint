import React from 'react';
import {Link} from 'react-router-dom';
import Feature from '../FeatureComponent';

const Home = () => {
    return (
        <>
            <div className='heroElement'>
                <div className='heroElement__contentBox'>
                   <div className='heroElement__textBox'>
                    <h1 className='headingPrimary'>We Love &lt; Coding &#47; &gt;</h1>
                    </div>
                    <div className='heroElement__subtext'>
                        <p className='subheading'>We help the developers find best solutions to their problems.</p>
                    </div>
                    <div className='heroElement__btn'>
                        <Link to='/' className='btn btn--pink'>Get started</Link>
                    </div>
                    <i className="heroElement__icon fa fa-chevron-down"></i>
                </div>
            </div>
            <Feature />
        </>
    )
}

export default Home
