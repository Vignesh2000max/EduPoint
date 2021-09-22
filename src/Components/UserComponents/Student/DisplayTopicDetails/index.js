import React from 'react'

const TopicDetails = (props) => {
    return (
        props.topics.topics.map((topic) => {
            if(topic.topicId === props.topicId)
            {
            return(
                <div className='topicCotainer'>
                    <div className='topicCotainer__title'>
                        <h1>{topic.topicTitle}</h1>
                    </div>
                    <div className='topicCotainer__Video'>
                        <video controls="controls" src={topic.videoUrl}>
                            Your browser does not support the HTML5 Video element.
                        </video>
                    </div>
                    <div className='topicCotainer__details'>
                        <div className='topicCotainer__details--description'>
                            <p>{topic.topicDesc}</p>
                        </div>
                        <div className='topicCotainer__details--doc'>
                            <embed src={topic.document}/>
                        </div>
                    </div>
                </div>
            );
            }
        })
        
    )
}

export default TopicDetails
