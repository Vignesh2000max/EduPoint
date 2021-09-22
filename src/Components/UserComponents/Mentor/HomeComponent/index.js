import React from 'react';
import {Link} from 'react-router-dom';

const MentorHome = (props) => {
    const [classname, setClassname] = React.useState(false);
    const [subjTitle, setSubjtitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    console.log("Subjects/////",props.subjects.subjects)

    const toggleClassName = React.useCallback(() => {
        setClassname(!classname);
    }, [classname])
        
    const loadClasses = (subjectId) => {
        props.fetchClasses(subjectId);
        console.log("function called with subject id", subjectId)
    }

    const handleAddNewSubj = React.useCallback((e) => {
        props.addNewSubject({subjectTitle: subjTitle, uId: props.user.uId, username:props.user.displayName, description: description});
        e.preventDefault();
    }, [subjTitle, props,description])

    return (
        <>
        <div className='MentorHome'>
            <div className = "userInfoContainer">
                {
                    (!props.user.photoUrl) ? 
                    <div className = 'userInfoContainer__userImage'>
                        <span className = "fa fa-user userInfoContainer__userImage--image"></span>&nbsp;&nbsp;<Link to="/updateInfo" className = "editIcon"><span className='fa fa-edit'></span></Link>
                    </div>
                    :
                    <div className = 'userInfoContainer__userImage'>
                        <img src = {props.user.photoUrl} alt ="user" className="userInfoContainer__userImage--uimage" />
                    </div>
                }
                <div className = 'userInfoContainer__userInfo'>
                    <h3>{props.user.displayname}</h3>
                    {
                        (!props.user.description) ?
                        <>
                            <p>Describe user self <Link to="/updateInfo" className = "editIcon"><span className='fa fa-edit'></span></Link></p>
                        </>
                        :
                        <>
                            <p>{props.user.description}</p>
                        </>
                    }
                </div>
            </div>
            <div className="userClasses">
                <div className="userClasses__head">
                    <h3>Subjects</h3>
                    <button onClick={toggleClassName} className = "Linkbtn">Add new subject</button>
                </div>
                <form className={!classname ? `closedForm` : `subjModal`}>
                    <span className='subjModal__span'>
                        <span>
                            <label className='subjModal__span--label' htmlFor='subjName'>Subject title</label>
                            <input onChange={(e) => setSubjtitle(e.target.value)} className='subjModal__span--input' type='text' id='subjName' placeholder='Subject name'/>
                        </span>
                        <span>
                            <label className='subjModal__span--label' htmlFor='subjDesc'>Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} rows='10' cols='40' className='subjModal__span--input' id='subjDesc' placeholder='Describe this course'>
                            </textarea> 
                       </span>
                    </span>
                    <span className='subjModal__buttonSpan'>
                        <button onClick={handleAddNewSubj} className='btn subjModal__buttonSpan--border'>Add</button>
                        <button onClick={toggleClassName} className='btn subjModal__buttonSpan--border'>Close</button>
                    </span>
                </form>
                <ul className="userClasses__classes">
                    {
                        !props.subjects.subjects ?
                        <li>No Subjects.</li>
                        :
                        props.subjects.subjects.map((subject) => {
                            return(
                                <li key={subject.subjId} onClick={() => loadClasses(subject.subjId)}><Link to={`/classes/${subject.subjectTitle}/${subject.subjId}`} className='userClasses__classes--Link'>{subject.subjectTitle}</Link></li>
                            );
                        }) 
                    }
                </ul>
            </div>
        </div>
        </>
    )
}

export default MentorHome
