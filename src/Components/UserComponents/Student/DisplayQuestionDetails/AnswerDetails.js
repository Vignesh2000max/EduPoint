import React from 'react'

const AnswerDetails = (props) => {
    return (

        props.Answers.answers.map(answer => {
            if(answer.answerId === props.ids.ansId)
            return(
                <div className='answerDetails'>
                    <div className='answerDetails__doc'>
                        <embed src={answer.fileUrl}/>
                        <span><p>{answer.description}</p><h3>PostedBy: {answer.postedBy.user}</h3></span>
                    </div>
                        {
                            !answer.videoLink ?
                            <div></div>
                            :
                            <div className='answerDetails__description'>
                                <iframe className='answerDetails__description--iframe' width="700" 
                                height="400" 
                                src={answer.videoLink}
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen title={answer.videoLink}></iframe>
                            </div>
                        }
                </div> 
            );
        })

        
    )
}

export default AnswerDetails
