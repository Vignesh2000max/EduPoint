import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Footer from './FooterComponent';
import Home from './HomePage';
import Nav from './NavBar';
import Signup from './Signup';
import Login from './LoginComponent';
import StudentNav from './UserComponents/Student/NavBarComponent';
import StudentHome from './UserComponents/Student/HomeComponent';
import CourseModules from './UserComponents/Student/DisplayCourses/CourseModules';
import DiscussionForum from './UserComponents/Student/DisplayCourses/DiscussionForum';
import QuestionDetails from './UserComponents/Student/DisplayQuestionDetails';
import AnswerDetails from './UserComponents/Student/DisplayQuestionDetails/AnswerDetails'
import MentorNav from './UserComponents/Mentor/NavBarComponent';
import MentorHome from './UserComponents/Mentor/HomeComponent';
import ShowClasses from './UserComponents/Mentor/CreateClassComponent';
import CreateNewClass from './UserComponents/Mentor/CreateClassComponent/CreateNewClass';
import DisplayTopicDetails from './UserComponents/Mentor/CreateClassComponent/DisplayTopicDetails';
import DisplayCourses from './UserComponents/Student/DisplayCourses';
import { connect } from 'react-redux';
import { signupUser, googleSignup, loginUser, googleLogin, logout, addNewSubject, fetchSubjects, addNewClass,
         fetchClasses, fetchTopics, fileUpload, fetchCourses, enrollCourse, imageUpload, recordIds, fetchQuestion,
         fetchAnswers, uploadAnswerDoc, updateVote } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      LoggingUserInfo: state.LoggingUserInfo,
      Subjects: state.Subjects,
      Classes: state.Classes,
      Topics: state.Topics,
      VideoUpload: state.VideoUpload,
      DocUpload: state.DocUpload,
      EnrolledCourses:state.EnrolledCourses,
      RecordIds: state.RecordIds,
      Discuss: state.Discuss,
      Answers: state.Answers
    }
}

const mapDispatchToProps = (dispatch) => ({
    signupUser: (creds) => dispatch(signupUser(creds)),
    googleSignup: (usertype) => dispatch(googleSignup(usertype)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    googleLogin: () => dispatch(googleLogin()),
    logout: () => dispatch(logout()),
    addNewSubject: (creds) => dispatch(addNewSubject(creds)),
    fetchSubjects: (uId) => dispatch(fetchSubjects(uId)),
    addNewClass: (creds) => dispatch(addNewClass(creds)),
    fetchClasses: (subjId) => dispatch(fetchClasses(subjId)),
    fetchTopics: (classId, classTitle, clasDesc) => dispatch(fetchTopics(classId, classTitle, clasDesc)),
    fileUpload: (creds) => dispatch(fileUpload(creds)),
    fetchCourses: () => dispatch(fetchCourses()),
    enrollCourse: (creds) => dispatch(enrollCourse(creds)),
    imageUpload: (creds) => dispatch(imageUpload(creds)),
    recordIds: (creds) => dispatch(recordIds(creds)),
    fetchQuestion: (classid) => dispatch(fetchQuestion(classid)),
    uploadAnswerDoc: (creds) => dispatch(uploadAnswerDoc(creds)),
    fetchAnswers: (qstId) => dispatch(fetchAnswers(qstId)),
    updateVote: (creds) => dispatch(updateVote(creds))
  });
  

class Main extends Component {

    // componentWillUnmount() {
    //     this.props.logout();
    // }
    
render(){
        const HomeComponent = () => {
            return(
                <Home/>
            );
        }

        const signupUser = ({match}) => {
            return(
                <Signup user = {match.params.userType}
                        Auth = {this.props.Auth}
                        signupUser = {this.props.signupUser}
                        googleSignup = {this.props.googleSignup}
                    />
            );
        }

        const loginUser = () => {
            return(
                <Login  loginUser = {this.props.loginUser}
                        googleLogin = {this.props.googleLogin} />
            );
        }

        const mentorHome =  () => {
            return(
                <MentorHome user = {this.props.LoggingUserInfo} subjects = {this.props.Subjects} fetchClasses = {this.props.fetchClasses} fetchSubjects = {this.props.fetchSubjects} addNewSubject={this.props.addNewSubject}/>
                );
        }

        const showClasses = ({match}) => {
            return(
                <ShowClasses subjectTitle = {match.params.subjTitle}
                subjectId = {match.params.subjId}
                addNewClass = {this.props.addNewClass}
                classes = {this.props.Classes} 
                fetchTopics = {this.props.fetchTopics}
                topics = {this.props.Topics}
                discuss={this.props.Discuss}
                recordIds={this.props.recordIds}
                fetchQuestion={this.props.fetchQuestion}
                fetchAnswers={this.props.fetchAnswers}
                 />
            );
        }

        const createnewClass = ({match}) => {
            return(
                <CreateNewClass VideoUpload={this.props.VideoUpload}  DocUpload={this.props.DocUpload} classid={match.params.classid} fileUpload = {this.props.fileUpload}/>
            );
        }

        const displayTopicDetails = ({match}) => {
            return(
                <DisplayTopicDetails topicId={match.params.topicId} topics = {this.props.Topics}/>
            )
        }

        const displayCourses = () => {
            return(
                <DisplayCourses Subjects={this.props.Subjects} enrollCourse={this.props.enrollCourse}  user={this.props.LoggingUserInfo}/>
            );
        }

        const courseModules = ({match}) => {
            return(
                <CourseModules fetchQuestion={this.props.fetchQuestion}
                                discuss={this.props.Discuss}
                                recordIds={this.props.recordIds}
                                user={this.props.LoggingUserInfo}
                                courseId={match.params.courseId}
                                author={match.params.author}
                                classes={this.props.Classes}
                                fetchTopics={this.props.fetchTopics}
                                topics={this.props.Topics}
                                fetchAnswers={this.props.fetchAnswers}/>
            );
        }

        const discuss = () => {
            return(
                <DiscussionForum user={this.props.LoggingUserInfo} imageUpload={this.props.imageUpload} cid={this.props.RecordIds.cid}/>
            );
        }

        const displayQuestion = () => {
            return(
                <QuestionDetails uploadAnswerDoc={this.props.uploadAnswerDoc} 
                qstId={this.props.RecordIds.qstId}
                questions={this.props.Discuss.questions}
                user={this.props.LoggingUserInfo}
                Answers={this.props.Answers}
                updateVote={this.props.updateVote}
                recordIds={this.props.recordIds}/>
            )
        }

        const answerDetails = () => {
            return(
                <AnswerDetails ids={this.props.RecordIds}
                Answers={this.props.Answers}/>
            );
        }
        
        return(
            <div>
                {   
                    (!this.props.LoggingUserInfo.isAuthenticated) ?
                    <>
                    <Nav />
                        <Route path='/home' component={HomeComponent} />
                        <Route exact path='/signup/:userType' component={signupUser} />
                        <Route exact path='/login' component={loginUser} />
                        <Redirect to='/home'/>
                    
                    <Footer />
                    </>
                    :
                    <>
                    {
                        (this.props.LoggingUserInfo.userType === "student") ?
                        <>
                            <StudentNav userAuth={this.props.LoggingUserInfo} logout={this.props.logout}/>
                                <Route path="/home"><StudentHome enrolled={this.props.EnrolledCourses} fetchClasses={this.props.fetchClasses}/></Route>
                                <Route path="/courses" component={displayCourses} />
                                <Route exact path="/:courseId/:author" component={courseModules} />
                                <Route exact path="/:topicId" component={displayTopicDetails} />
                                <Route path='/discussion' component={discuss} />
                                <Route path='/questionDetils' component={displayQuestion}/>
                                <Route path='/answer' component={answerDetails}/>
                                <Redirect to="/home" />  
                        </>
                        :
                        <>
                            <MentorNav logout={this.props.logout} userAuth = {this.props.LoggingUserInfo}/>
                                <Route path='/home' component={mentorHome} />
                                <Route exact path='/classes/:subjTitle/:subjId' component={showClasses} />
                                <Route exact path='/newTopic/:classid' component={createnewClass} />
                                <Route exact path='/:topicId' component={displayTopicDetails} />
                                <Route path='/questionDetils' component={displayQuestion}/>
                                <Route path='/answer' component={answerDetails}/>
                                <Redirect to='/home'/>
                        </>
                    }
                    </>
                }

            </div>
        )
    }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
