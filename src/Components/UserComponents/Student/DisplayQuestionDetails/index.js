import React from 'react'
import { Link } from 'react-router-dom';

const QuestionDetails = (props) => {
    const [description, setDescription] = React.useState();
    const [descriptionError, setDescError] = React.useState('');
    const [files, setFiles] = React.useState();
    const [fileError, setFileError] = React.useState('');
    const [hasError, setHasError] = React.useState(true);
    const [errorClass, setErrorClass] = React.useState('');
    const [vidLink, setVideoLink] = React.useState('');
    let Voted = false;

    const validateDescription = () => {
        if(!description || description.length > 200)
        {
            setDescError('Title should be between 200 and 500')
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setDescError('');
            setErrorClass('');
        }
    }

    const validateFile = () => {

        if(!files ||  files.type !== 'image/jpeg' && files.type !== 'application/pdf')
        {
            setFileError('Only Image or PDF formate is allowed');
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setFileError('');
            setErrorClass('')
        }
    }

    const uploadQuestion = (e, creds) => {
        props.uploadAnswerDoc({description: description,
             file: files, username: props.user.displayName,
              userId: props.user.uId, qstId: creds.qstId,
               videoLink: vidLink, qstTitle: creds.qstTitle})
        e.preventDefault();
    }

    const updateVote = (e, creds) => {
        props.updateVote(creds)
        e.preventDefault();
    }

    const handleVote = (req) => {
        if(req === 'allow')
            Voted = false
        else if(req === 'denie')
            Voted = true
    }

    const recordAnsId = (e, creds) => {
        props.recordIds(creds)
        e.preventDefault()
    }

    return (
         props.questions.map(question => {
               if(question.questionId === props.qstId)
               return(
                   <>
                    <div className='question'>
                        <div className='question__head'>
                            <h1 className='question__head--h1'>{question.title}</h1>
                            <span>Posted By: {question.postedBy.name}</span>
                        </div>
                        <div className='question__description'>
                            <p>{question.description}</p>
                        </div>
                        <embed className='question__Image' src={question.Url} />
                    </div>
                    <div className='answers'>
                        <h1>Answers found:</h1>
                            {   !props.Answers.answers ?
                                <div></div>
                                :
                                props.Answers.answers.map(answer => {
                                    return(
                                        <div className='answerList'>
                                            {
                                                (answer.voted.includes(props.user.uId)) ? handleVote("denie") : handleVote("allow")
                                                    
                                            }
                                            <div className='answerList__votes'>
                                                <button disabled={Voted} onClick={e => updateVote(e, {req: "upvote", votedList: answer.voted, ansId: answer.answerId, qstId: question.questionId, votes:answer.votes, votedUser: props.user.uId})} className='fa fa-caret-up'></button>
                                                <p>{answer.votes}</p>
                                                <button disabled={Voted} onClick={e => updateVote(e, {req: "downvote", votedList: answer.voted, ansId: answer.answerId, qstId: question.questionId, votes:answer.votes, votedUser: props.user.uId})} className='fa fa-caret-down'></button>
                                            </div>
                                            <div className='answerList__details'>
                                                <h3>{answer.description}</h3>
                                                <p>Posted By: {answer.postedBy.user}</p>
                                                <span onClick={(e => recordAnsId(e, { req: "ansId", ansId: answer.answerId}))}><Link to='/answer'>More info</Link></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                    </div>
                    {
                        (question.postedBy.id === props.user.uId) ?
                        <div></div>
                        :
                        <div className='postAnswer'>
                            <h1>Post your answer</h1>
                            <form className='form'>
                                <span>
                                    <textarea onBlur={validateDescription} onChange={e => setDescription(e.target.value)} id='classDescription' rows="10" cols="90"  placeholder='Post solution for this problem'></textarea>
                                </span>
                                { (descriptionError != null) ? 
                                <p className = {errorClass}>{descriptionError}</p>:<p></p>
                                }
                                <span>
                                    <label htmlFor='file'>Select pdf/Image to upload</label>
                                    <input onBlur={validateFile} onChange={e => setFiles(e.target.files[0])} type='file' id='file'/>
                                </span>
                                { (fileError != null) ? 
                                <p className = {errorClass}>{fileError}</p>:<p></p>
                                }
                                <span>
                                    <label htmlFor='videofile'>Video Url</label>
                                    <input onChange={e => setVideoLink(e.target.value)} type='input' id='videofile'/>
                                </span>
                                <button disabled={hasError} onClick={(e) => uploadQuestion(e, {qstId: question.questionId, qstTitle: question.title})}>Post</button>
                            </form>
                        </div>
                    }
                    </>
               )
            })
        
    )
}

export default QuestionDetails
