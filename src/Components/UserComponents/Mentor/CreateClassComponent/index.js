import React from 'react'
import { Link } from 'react-router-dom';

const ShowClasses = (props) => {
    const [classname, setClassname] = React.useState(false);
    const [topicDivClass, setTopicDivClass] = React.useState(true);
    const [discussionDivClass, setDiscussionDivClass] = React.useState(false);
    const [Module, setModule] = React.useState('');
    const [description, setDescription] = React.useState('');

    const recordIds = (req ,id) => {
        if(req === 'qstId')
        {
            props.recordIds({qstId: id, req: req})
            props.fetchAnswers(id)
        }
    }

    const toggleTopicClass = () => {
        setTopicDivClass(true);
        setDiscussionDivClass(false);
    }

    const toggleDiscussionClass = () => {
        setDiscussionDivClass(true);
        setTopicDivClass(false);
    }


    const loadTopics = (classId, classTitle) => {
        console.log('FETCHINGGGG', classTitle)
        props.fetchTopics(classId, classTitle)
        props.fetchQuestion(classId);
    }

    const toggleClassName = React.useCallback(() => {
            setClassname(!classname);
        }, [classname])

    const handleAddNewClass = (e) => {
        props.addNewClass({classTitle: Module, subjectTitle: props.subjectTitle, subjectId: props.subjectId, description:description});
        e.preventDefault();
    }

    return (
        <div className='showClassesContainer'>
            <div className='showClasses'>
                <div className='showClasses__head'>
                <h3 className='showClasses__head--h'>{props.subjectTitle} Classes</h3>
                <button onClick={toggleClassName} className = "Linkbtn">Create new class</button>
                </div>
                <form className={!classname ? `closedForm` : `subjModal`}>
                    <span className='subjModal__span'>
                        <span>
                        <label className='subjModal__span--label' htmlFor='subjName'>Module name</label>
                        <input onChange={(e) => setModule(e.target.value)} className='subjModal__span--input' type='text' id='subjName' placeholder='Module name'/>
                        </span>
                        <span>
                            <label className='subjModal__span--label' htmlFor='subjDesc'>Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} rows='10' cols='40' className='subjModal__span--input' id='subjDesc' placeholder='Describe this course'>
                            </textarea> 
                       </span>
                    </span>
                    <span className='subjModal__buttonSpan'>
                        <button onClick={handleAddNewClass} className='btn subjModal__buttonSpan--border'>Add</button>
                        <button onClick={toggleClassName} className='btn subjModal__buttonSpan--border'>Close</button>
                    </span>
                </form>
                <ul className='showClasses__classList'>
                    {
                        !props.classes.classes ?
                            <li className='showClasses__classList--list'>No classes create new class</li>
                        :
                        props.classes.classes.map((classlist) => {
                            return(
                                <li className='showClasses__classList--list' key={classlist.classId} onClick={() => loadTopics(classlist.classId, classlist.classTitle)}>
                                    <p>{classlist.classTitle}</p>
                                </li>
                            );
                        })   
                    }
                </ul>
            </div>
            <div className='classDetails'>
                <div className='classDetails__head'>
                    <h3 onClick={toggleTopicClass} className={!topicDivClass ? `closeTopicsHead` : `TopicsHead`}>Topics</h3>
                    <h3 onClick={toggleDiscussionClass} className={!discussionDivClass ? `closeDiscussionHead` : `DiscussionHead`}>Discussion forum</h3>
                </div>
                <div className={!topicDivClass ? `closeTopics` : `classDetails__Topics`}> 
                    <h1 className='listHead'>{props.topics.classTitle}</h1>  
                    <ul className='Ullist'>
                        {
                            !props.topics.topics ?
                            <li>No Topic to show.</li>
                            :
                            props.topics.topics.map((topic) => {
                                return(<>
                                    <li key={topic.topicId}><Link to={`/${topic.topicId}`}>{topic.topicTitle}</Link></li>
                                    {/* <embed src={topic.document} width="500px" height="1000px" /> */}
                                    </>
                                );
                            })
                        }
                    </ul>
                    <Link to={`/newTopic/${props.topics.classID}`} className='LinkBtn'>Add new Topic</Link>
                </div>
                <div className={!discussionDivClass ? `closediscussion` : `classDetails__discussion`}>
                    <ul className='Ullist'>
                        <h1 className='listHead'>{props.topics.classTitle}</h1>  
                        {
                            !props.discuss.questions ?
                            <li>No Questions</li>
                            :
                            props.discuss.questions.map(question => {
                                return (
                                <li key={question.questionId} onClick={() => recordIds("qstId", question.questionId)}><Link to={`/questionDetils`}>{question.title}</Link></li>
                                )
                            })
                        }   
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ShowClasses
