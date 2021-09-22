import React from 'react'

const DisplayCourses = (props) => {
    
    const handleEnrollment = (subjID, subjTitle, subjDesc, author) => {
        props.enrollCourse({studentId: props.user.uId, subjectId: subjID, subjecTitle: subjTitle, subjectDescription: subjDesc, authorId: author});   
    }
    console.log('STUDENT...', props.user.uId)
    return (
        <div className='displayCourses'>
            <div className='courseList'>
                <h1>Courses</h1>
                {
                    !props.Subjects.subjects ?
                        <h4>No Courses to enroll.</h4>
                    :
                    props.Subjects.subjects.map(course => {
                        return(
                            <span className='displayCourses__courseDetail'>
                                <span className='displayCourses__courseDetail--detail'>
                                    <h3 className='displayCourses--h3'>{course.subjectTitle}</h3>
                                    <span className='displayCourses--p'>{course.description}</span>
                                </span>
                                <span className='displayCourses__courseDetail--author'>
                                    <p className='displayCourses--user'>AUTHOR:&nbsp; {course.username} </p>
                                    <button onClick={() => handleEnrollment(course.subjId, course.subjectTitle, course.description, course.username)} className='Linkbtn'>Enroll now</button>
                                </span>
                            </span>
                        );
                    })
                }
            </div>
            
            
        </div>
    )
}

export default DisplayCourses
