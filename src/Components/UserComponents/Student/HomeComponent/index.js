import React from 'react'
import { Link } from 'react-router-dom';

const StudentHome = (props) => {

    const fetchModuleSubject = (subjId) => {
        props.fetchClasses(subjId)
    }

    return (
        <div className='StudentHome'> 
            <div className='courseList'>
                <h1>Enrolled Courses</h1>
            {
                !props.enrolled.courses ?
                    <h4>No Courses to enroll.</h4>
                :
                props.enrolled.courses.map(course => {
                    return(
                        <span key={course.courseId} className='displayCourses__courseDetail'>
                            <span className='displayCourses__courseDetail--detail'>
                               `<h3 onClick={() => fetchModuleSubject(course.subjectId)} className='displayCourses--h3'><Link to={`/${course.subjectId}/${course.authorId}`}>{course.subjectTitle}</Link></h3> 
                                <span className='displayCourses--p'>{course.subjectDescription}</span>
                            </span>
                            <span className='displayCourses__courseDetail--author'>
                                <p className='displayCourses--user'>Instructor: &nbsp; {course.authorId}</p>
                            </span>
                        </span>
                    );
                })
            }
            </div>
        </div>
    )
}

export default StudentHome
