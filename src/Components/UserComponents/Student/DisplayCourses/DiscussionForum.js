import React from 'react'

const DiscussionForum = (props) => {
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [files, setFiles] = React.useState();
    const [titleError, setTitleError] = React.useState('');
    const [descriptionError, setDescError] = React.useState('');
    const [fileError, setFileError] = React.useState('');
    const [hasError, setHasError] = React.useState(true);
    const [errorClass, setErrorClass] = React.useState('');

    // let fileSelected = [];
    // if(!files)
    // {
    //     console.log("NULLLL")
    // }
    // else{
    //     Array.from(files).forEach(file => fileSelected.push(file));
    // }

    const validateTitle = () => {
    if(!title || title.length < 30 || title.length > 70)
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

    const validateDescription = () => {
        if(!description || description.length < 200 || description.length > 500)
        {
            setDescError('description should be between 100 and 200')
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setDescError('');
            setErrorClass('');
        }
    }

    const validateFile = () => {

        if(!files ||  files.type !== 'image/jpeg')
        {
            setFileError('Only Image formate is allowed');
            setErrorClass('fieldError')
        }
        else{
            setHasError(false);
            setFileError('');
            setErrorClass('')
        }
    }

    const handleImageUpload = (e) => {
        props.imageUpload({file: files, title: title, description: description, classID: props.cid, username: props.user.displayName, userId: props.user.uId})
        e.preventDefault();
    }

        return (
                <div className='newDiscussionForum'>    
                        <h1>New discussion Forum</h1>
                        <form encType="multipart/form-data" className='form'>
                            <span>
                                <label htmlFor='title'>Title</label>
                                <input onBlur={validateTitle} onChange={e => setTitle(e.target.value)} type='text' id='title' placeholder='Title'/>
                            </span>
                            { (titleError != null) ? 
                                <p className = {errorClass}>{titleError}</p>:<p></p>
                            }
                            <span>
                                <textarea  onBlur={validateDescription} onChange={e => setDescription(e.target.value)} id='classDescription' rows="10" cols="90"  placeholder='Detailed Explaination'></textarea>
                            </span>
                            { (descriptionError != null) ? 
                                <p className = {errorClass}>{descriptionError}</p>:<p></p>
                            }
                            <span>
                                <label htmlFor='doc'>Images</label>
                                <input onBlur={validateFile} onChange={e => setFiles(e.target.files[0])} type='file' name='doc' id='doc' />
                            </span>
                            { (fileError != null) ? 
                                <p className = {errorClass}>{fileError}</p>:<p></p>
                            }
                            <p style={{color: 'red', fontSize: '1.2rem', fontWeight: '400'}}>*Upload Problem Image*</p>
                        <button disabled={hasError} onClick={handleImageUpload}>Create</button>
                    </form>
                </div>
            ) 
}

export default DiscussionForum
