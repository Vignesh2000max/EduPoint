import React from 'react'

const Feature = () => {
    return (
        <div className='featureBox'>
            <h1 className='headingSecondary color-black'>Features</h1>
            <div className='featureBox__container'>
                <div className='featureBox__feature'>
                    <i class="fa fa-connectdevelop featureBox__feature--icon"></i>
                    <p className='featureBox__feature--content'>Share your knowledge with other developers.</p>
                </div>

                <div className='featureBox__feature'>
                    <i class="fa fa-rocket featureBox__feature--icon"></i>
                    <p className='featureBox__feature--content'>Reach to the top by providing best solutions.</p>
                </div>

                <div className='featureBox__feature'>
                    <i class="fa fa-search featureBox__feature--icon"></i>
                    <p className='featureBox__feature--content'>Search for the best solutions to your problems.</p>
                </div>
            </div>
        </div>
    )
}

export default Feature
