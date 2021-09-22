import React from 'react';
import Spinner from '../../../UI/index';

const CreateNewClass = (props) => {
    const [file, setFile] = React.useState();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] =React.useState('');
    const [video, setVideo] = React.useState();
    const [hasError, setHasError] = React.useState(true);
    const [titleError, setTitleError] = React.useState('');
    const [descriptionError, setDescError] = React.useState('');
    const [fileError, setFileError] = React.useState('');
    const [videoError, setVideoError] = React.useState('');
    const [errorClass, setErrorClass] = React.useState('');
    const [vidLink, setVideoLink] = React.useState('');
    const [vidLinkError, setVideoLinkError] = React.useState('');

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    console.log("FILESSSS", file, "classID", props.classid);

    const onVideoFileChange = (e) => {
        setVideo(e.target.files[0]);
    }

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        props.fileUpload({vidLink: vidLink, videoName: video.name, video: video, filename: file.name, file: file, classId: props.classid, topicTitle: title, topicDesc: description});
        e.preventDefault();
    }

    const validateTitle = () => {
        if(!title || title.length < 50 || title.length > 70)
        {
            setTitleError('Title should be between 50 and 70');
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setTitleError('');
            setErrorClass('')
        }
    }

    const validateVideoLink = () => {
        if(!vidLink || !pattern.test(vidLink))
        {
            setVideoLinkError('Invalid video Link')
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setVideoLinkError('');
            setErrorClass('')
        }
    }

    const validateDescription = () => {
        if(!description || description.length < 100 || title.length > 200)
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

        if(!file ||  file.type !== 'application/pdf')
        {
            setFileError('Only PDF formate is allowed');
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setFileError('');
            setErrorClass('')
        }
    }
    const validateVideo = () => {

        if(!video || video.type !== "video/mp4")
        {
            setVideoError('Only mp4 or mkv formate is allowed');
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setVideoError('');
            setErrorClass('')
        }
    }


    return (
        <>
        <div className='createClass'>
            {
                (props.VideoUpload.isLoading || props.DocUpload.isLoading) ?
                    <Spinner/>
                :
                <>
                    <h1>Create Module</h1>
                    <form className='form'>
                        <span>
                            <label htmlFor='title'>Title</label>
                            <input onBlur={validateTitle} type='text' id='title' placeholder='Title' onChange={e => setTitle(e.target.value)}/>
                        </span>
                        { (titleError != null) ? 
                                <p className = {errorClass}>{titleError}</p>:<p></p>
                        }
                        <span>
                            <label htmlFor='doc'>Document</label>
                            <input onBlur={validateFile} type='file' name='doc' id='doc' onChange = {onFileChange}/>
                        </span>
                        { (fileError != null) ? 
                                <p className = {errorClass}>{fileError}</p>:<p></p>
                        }
                        <span>
                            <label htmlFor='doc'>Video</label>
                            <input onBlur={validateVideo} type='file' id='vid' onChange = {onVideoFileChange}/>
                        </span>
                        { (videoError != null) ? 
                                <p className = {errorClass}>{videoError}</p>:<p></p>
                        }
                        <span>
                            <label htmlFor='classDescription'>Description</label>
                            <textarea onBlur={validateDescription} id='classDescription' rows="10" cols="40" placeholder='Description' onChange={e => setDescription(e.target.value)} />
                        </span>
                        { (descriptionError != null) ? 
                                <p className = {errorClass}>{descriptionError}</p>:<p></p>
                        }
                        <span>
                            <label htmlFor='videofile'>Video Url</label>
                            <input onBlur={validateVideoLink} onChange={e => setVideoLink(e.target.value)} type='input' id='videofile'/>
                        </span>
                        { (vidLinkError != null) ? 
                                <p className = {errorClass}>{vidLinkError}</p>:<p></p>
                        }
                        <button disabled={hasError} onClick={handleSubmit}>Create</button>
                    </form>
                </>
            }
        </div>
        </>
    )
}

export default CreateNewClass
