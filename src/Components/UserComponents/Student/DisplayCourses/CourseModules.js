import React from 'react'
import { Link } from 'react-router-dom';

const CourseModules = (props) => {
    const [topicDivClass, setTopicDivClass] = React.useState(true);
    const [discussionDivClass, setDiscussionDivClass] = React.useState(false);

    const recordIds = (req ,id) => {
        if(req === 'classId')
        {
            props.recordIds({cid: id, req: req})
        }
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

    const fetchTopics = (classId, subjTitle, clasDesc) => {
        props.fetchTopics(classId, subjTitle, clasDesc);
        props.fetchQuestion(classId);
    }

    return (
        <>
        <div className= 'courseModules'>
            <div className='moduleList'>
                <h1>Courses Modules</h1>
            {
                !props.classes.classes ?
                    <h4>No Courses to enroll.</h4>
                :
                props.classes.classes.map(module => {
                    return(
                        <span key={module.classId} className='moduleList__card'>
                            <span className='moduleList__card--details'>
                                <h3 onClick={() => fetchTopics(module.classId, module.classTitle, module.description)}><Link>{module.classTitle}</Link></h3> 
                            </span>
                        </span>
                    );
                })
            }
            </div>
            <div className='classdetails'>
                <div className='classDetails__head'>
                    <h3 onClick={toggleTopicClass} className={!topicDivClass ? `closeTopicsHead` : `TopicsHead`}>Topics</h3>
                    <h3 onClick={toggleDiscussionClass} className={!discussionDivClass ? `closeDiscussionHead` : `DiscussionHead`}>Discussion forum</h3>
                </div>
                <div className={!topicDivClass ? `closed` : `topicList`}>
                    <h1>{props.topics.classTitle}</h1>
                    <span className='topicList__classDetail'>
                        <h3>Instructor : {props.author}</h3>
                        <p>{props.topics.classDescription}</p>
                    </span>
                    {
                        !props.topics.topics ?
                            <h4>No Topics.</h4>
                        :
                        props.topics.topics.map(topic => {
                            return(
                                <span key={topic.topicId} className='moduleList__card'>
                                    <span className='moduleList__card--details'>
                                        <h3><Link to={`/${topic.topicId}`}>{topic.topicTitle}</Link></h3> 
                                    </span>
                                </span>
                            );
                        })
                    }
                    <h3 onClick={() => recordIds("classId", props.topics.classID)}><Link className='LinkBtn u-margin-medium' to='/discussion'>Ask Questions</Link></h3>
                </div>

                <div className={!discussionDivClass ? `closed` : `discussionForm`}>
                    <h1>{props.topics.classTitle}</h1>
                    <ul className='Ullist'>
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
        </>
    )
}

export default CourseModules
