import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth, firebasestore, firebaseStorage } from '../firebase/firebase';
import { createSelectorHook } from 'react-redux';

// SIGNUP--------------------------

export const requestLogUserInfo = () => {
    return{
        type: ActionTypes.REQ_LOG_USER_INFO
    }
}

export const logUserInfoSuccess = (uId, displayname, usertype, photoUrl) => {
    return{
        type: ActionTypes.LOG_USER_INFO_SUCCESS,
        uId,
        displayname,
        usertype,
        photoUrl
    }
}

export const logUserInfoFailure = (error) => {
    return{
        type: ActionTypes.LOG_USER_INFO_FAILURE,
        error
    }
}

export const logUserInfo = (creds) => (dispatch) => {
    dispatch(requestLogUserInfo());

    firestore.collection("users").add({
        uId: creds.uId,
        username: creds.displayname,
        usertype: creds.usertype,
        photoUrl: creds.photoUrl,
        description: creds.description
    })
    .then((result) => {
        dispatch(logUserInfoSuccess(creds.uId, creds.displayname,creds.usertype, creds.photoUrl));
        console.log('user info logged successfully');
    }).catch((error) => {
        dispatch(logUserInfoFailure(error));
        console.log('user info logging failed');
    })
}

export const signupUser = (creds) => (dispatch) => {
    auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then((success) => {
        const user = auth.currentUser;
        const displayname = creds.username;
        const usertype = creds.usertype;
        const uId = auth.currentUser.uid;
        const photoUrl = '';
        const description = "";

        dispatch(logUserInfo({displayname, usertype, uId, photoUrl, description}));
        if(usertype === "student")
        {
            dispatch(fetchCourses())
        }
        console.log("signup Successfull", success);
    }).catch((error) => {
        console.log("signup Failed");
    })
}

export const googleSignup = (creds) => (dispatch) => {

    const provider = new fireauth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
    .then((result) => {
        var user = result.user;
        var displayname = auth.currentUser.displayName;
        const uId = auth.currentUser.uid;
        const usertype = creds.usertype;
        const photoUrl = '';
        const description = "";

        dispatch(logUserInfo({displayname, usertype, uId, photoUrl, description}));
        if(usertype === "student")
        {
            dispatch(fetchCourses())
        }
        console.log('google Signup successfull');
    }).catch((error) => {
        console.log("signup Failed");
    })
}
// -----------------------------------
// LOGIN------------------------------

const fetchUserInfo = (creds) => (dispatch) => {
    const uId = creds.uId;

    return firestore.collection('users').where('uId', '==', uId).get()
    .then(snapshot => {
        console.log('fetching......')
        let displayname = '';
        let usertype = '';
        let photoUrl = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            displayname = data.username;
            usertype = data.usertype;
            photoUrl = data.photoUrl;
        });
        dispatch(logUserInfoSuccess(uId, displayname, usertype, photoUrl));
        if(usertype === 'mentor'){
            dispatch(fetchSubjects(uId));
        }
        else{
            dispatch(fetchCourses());
            dispatch(fetchEnrolledCourse(uId))
        }
    })
    .then(result => {
        console.log('successfull');
    }).catch(error => {
        console.log('totally failed');
    })
}

export const loginUser = (creds) => (dispatch) => {

        auth.signInWithEmailAndPassword(creds.email, creds.password)
        .then((result) => {
            var user = auth.currentUser;
            const uId = auth.currentUser.uid;
            const email = creds.email;

            dispatch(fetchUserInfo({uId, email}));
            console.log('Login successfull', result);
        }).catch((error) => {
            console.log('Login failed', error);
        }) 
} 

export const googleLogin = () => (dispatch) => {

    const provider = new fireauth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            const uId = auth.currentUser.uid;
            const email = auth.currentUser.email;
            
            dispatch(fetchUserInfo({uId, email}));
            console.log('Login successfull', result);
        }).catch(error => {
            console.log('Login failed', error);
        })  
}

//LOGOUT------------------
export const logoutRequest = () => {
    return{
        type: ActionTypes.LOGOUT_REQUEST
    }
}
export const logout = () => (dispatch) =>{
    dispatch(logoutRequest())
}

//ADDING NEW SUBJECT------------------

export const reqFetchSubjects = (creds) => {
    return{
        type: ActionTypes.FETCH_SUBJ_REQUEST
    }
}

export const fetchSubjSuccess = (subjects) => {
    return{
        type: ActionTypes.FETCH_SUBJ_SUCESS,
        subjects
    }
}

export const fetchSubjFailed = (error) => {
    return{
        type: ActionTypes.FETCH_SUBJ_FAILED,
        error
    }
}

export const fetchSubjects = (uId) => (dispatch) => {
    dispatch(reqFetchSubjects());
    console.log('fetching subjects....', uId);

    firestore.collection("subjects").where('uId', '==', uId).get()
    .then(snapshot => {
        let subjects = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            const subjId = doc.id;
            subjects.push({subjId, ...data});
        });
        dispatch(fetchSubjSuccess(subjects));
        console.log(subjects);
    })
    .then(result => {
        console.log('successfull fetched subjects');
    }).catch(error => {
        dispatch(fetchSubjFailed(error));
        console.log('totally failed');
    })
}

export const addNewSubject = (creds) => (dispatch) => {
    console.log(creds, "function called")
    firestore.collection("subjects").add({
        uId: creds.uId,
        username: creds.username,
        subjectTitle: creds.subjectTitle,
        description: creds.description
    })
    .then((result) => {
        dispatch(fetchSubjects(creds.uId));
        console.log('subject added successfully');
    }).catch((error) => {
        console.log('subject couldnot be added');
    })
}

// ADDING NEW MODULE--------

export const requestfetchClass = () => {
    return{
        type: ActionTypes.FETCH_CLASS_REQUEST
    }
}

export const fetchClassSucess = (classes) => {
    return{
        type: ActionTypes.FETCH_CLASS_SUCESS,
        classes
    }
}

export const fetchClassFailed = (error) => {
    return{
        type: ActionTypes.FETCH_CLASS_FAILED,
        error
    }
}

export const fetchClasses = (subjId) => (dispatch) => {
    dispatch(requestfetchClass())
   console.log('fetching all classes.....', subjId)
    firestore.collection('classes').where('subjectId', '==', subjId).get()
    .then(snapshot => {
        let classes = []

        snapshot.forEach(doc => {
            const data = doc.data()
            const classId = doc.id
            classes.push({classId, ...data});
        });
        dispatch(fetchClassSucess(classes));
        console.log('Fetched all classes', classes);
    }).catch(error => {
        dispatch(fetchClassFailed(error));
        console.log('could not fetched classes');
    })
}

export const addNewClass = (creds) => (dispatch) => {
    firestore.collection('classes').add({
        subjectId: creds.subjectId,
        classTitle: creds.classTitle,
        subjectTitle: creds.subjectTitle,
        description: creds.description
    }).then((result) => {
        dispatch(fetchClasses(creds.subjectId))
        console.log('added new class successfully');
    }).catch(error => {
        console.log("Error adding new class", error)
    })
}

// FETCH TOPICS ----------

export const reqFetchTopics = () => {
    return{
        type: ActionTypes.FETCH_TOPICS_REQUEST
    }
}

export const fetchTopicsSuccess = (topics, classID, classTitle, classDescription) => {
    return{
        type: ActionTypes.FETCH_TOPICS_SUCESS,
        topics,
        classID,
        classTitle,
        classDescription
    }
}

export const fetchTopicsFailed = (error) => {
    return{
        type: ActionTypes.FETCH_TOPICS_FAILED,
        error
    }
}

export const fetchTopics = (classID, classTitle, classDescription) => (dispatch) => {
    let classDesc;
    !classDescription ? classDesc='' : classDesc=classDescription;
    dispatch(reqFetchTopics());
    firestore.collection('topics').where('classId', '==', classID).get()
    .then(snapshot => {
        let topics = []

        snapshot.forEach(topic => {
            const data = topic.data()
            const topicId = topic.id
            topics.push({topicId, ...data})
        });
        dispatch(fetchTopicsSuccess(topics, classID, classTitle, classDesc))
        console.log('topics Fetched complete', topics);
    }).catch(error => {
        dispatch(fetchTopicsFailed(error));
        console.log('topics Fetching failed', error);
    })
}

// TOPIC UPLOADING--------------

export const addNewTopic = (videoUrl ,creds) => (dispatch) => {
    firestore.collection('topics').add({
        classId: creds.classId,
        topicTitle: creds.topicTitle,
        topicDesc: creds.topicDesc,
        document: creds.docUrl,
        videoUrl: videoUrl,
        vidLink: creds.vidLink
    }).then(result => {
        dispatch(fetchTopics(creds.classId));
        alert("Topics added successfully");
        console.log('TOpic added');
    }).catch(error => {
        console.log('ERROR while adding topic.', error)
    })
}

export const reqUploadVideo = () => {
    return{
        type: ActionTypes.UPLOAD_VIDEO_REQUEST
    }
}

export const UploadVideoSuccess = () => {
    return{
        type: ActionTypes.UPLOAD_VIDEO_SUCCESS
    }
}

export const reqUploadFile = () => {
    return{
        type: ActionTypes.UPLOAD_DOC_REQUEST
    }
}

export const UploadFileSuccess = () => {
    return{
        type: ActionTypes.UPLOAD_DOC_SUCCESS
    }
}

export const videoUpload = (creds) => (dispatch) => {
    const uploadTask2 = firebaseStorage.ref(`videos/${creds.videoName}`).put(creds.video);
    uploadTask2.on('state_changed', 
    (snapshot) => {
        dispatch(reqUploadVideo())
        console.log(snapshot)
    }, 
    (error) => {
        console.log(error);
    },
    () => {
        dispatch(UploadVideoSuccess())
        firebaseStorage.ref('videos').child(creds.videoName).getDownloadURL().then(url => {
        const videoUrl = url;
        dispatch(addNewTopic(videoUrl, {...creds}))
    })
    }
    )
}

export const fileUpload = (creds) => (dispatch) => {
    const uploadTask = firebaseStorage.ref(`documents/${creds.filename}`).put(creds.file);
    uploadTask.on('state_changed', 
    (snapshot) => {
        dispatch(reqUploadFile())
        console.log(snapshot)
    }, 
    (error) => {
        console.log(error);
    },
    () => {
            dispatch(UploadFileSuccess())
            firebaseStorage.ref('documents').child(creds.filename).getDownloadURL().then(url => {
            const docUrl = url;
            dispatch(videoUpload({docUrl, ...creds}))
        })
    }
    )
}

// STUDENTS-----------

export const fetchCourses = () => (dispatch) => {
    dispatch(reqFetchSubjects());
    console.log('fetching COURSES....');

    firestore.collection("subjects").get()
    .then(snapshot => {
        let subjects = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            const subjId = doc.id;
            subjects.push({subjId, ...data});
        });
        dispatch(fetchSubjSuccess(subjects));
        console.log(subjects);
    })
    .then(result => {
        console.log('successfull fetched subjects');
    }).catch(error => {
        dispatch(fetchSubjFailed(error));
        console.log('totally failed');
    })
}

export const reqFetchEnrolled = () => {
    return{
        type: ActionTypes.FETCH_ENROLLED_COURSES_REQUEST
    }
}

export const fetchEnrolledSucess = (courses) => {
    return{
        type: ActionTypes.FETCH_ENROLLED_COURSES_SUCESS,
        courses
    }
}

export const fetchEnrolledFailed = (error) => {
    return{
        type: ActionTypes.FETCH_ENROLLED_COURSES_FAILED,
        error
    }
}

export const fetchEnrolledCourse = (uid) => (dispatch) => {
    dispatch(reqFetchEnrolled())

    firestore.collection('enrolled').where('studentId', '==', uid).get()
    .then(snapshot => {
        let courses = []

        snapshot.forEach(doc => {
            const data = doc.data()
            const courseId = doc.id
            courses.push({courseId, ...data})
        });
        dispatch(fetchEnrolledSucess(courses))
        console.log('FECHED ALL ENROLLED COURSES', courses)
    }).catch(error => { 
        dispatch(fetchEnrolledFailed(error))
        console.log('ERROR WHILE FETCHING ENROLLED COURSES')
    })
}

export const enrollCourse = (creds) => (dispatch) => {
    firestore.collection('enrolled').add({
        subjectId: creds.subjectId,
        subjectTitle: creds.subjecTitle,
        studentId: creds.studentId,
        subjectDescription: creds.subjectDescription,
        authorId: creds.authorId
    }).then(result => {
        dispatch(fetchEnrolledCourse(creds.studentId))
        alert('Enrollment successfull.');
    }).catch(error => {
        alert('Error while Enrolling.')
    })
}

// ---------------------------

export const reqUploadQuestion = () => {
    return{
        type: ActionTypes.ADD_QUESTION_REQUEST
    }
}

export const uploadQuestionSuccess = (questions) => {
    return{
        type: ActionTypes.ADD_QUESTION_SUCESS,
        questions
    }
}

export const uploadQuestionFailed = (error) => {
    return{
        type: ActionTypes.ADD_QUESTION_FAILED,
        error
    }
}

export const uploadQuestion = (creds) => (dispatch) => {
    
    firestore.collection('questions').add({
        classId: creds.classID,
        description: creds.description,
        title: creds.title,
        Url: creds.docUrl,
        postedBy:{
            name: creds.username,
            id: creds.userId
        }
    }).then(result => {
        dispatch(fetchQuestion(creds.classID))
        alert('submitted')
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}

export const imageUpload = (creds) => (dispatch) => {

    const uploadTask = firebaseStorage.ref(`Discussion/${creds.file.name}`).put(creds.file);
    uploadTask.on('state_changed', 
    (snapshot) => {
        dispatch(reqUploadFile())
        console.log(snapshot)
    }, 
    (error) => {
        console.log(error);
    },
    () => {
            dispatch(UploadFileSuccess())
            firebaseStorage.ref('Discussion').child(creds.file.name).getDownloadURL().then(url => {
            const docUrl = url;
            dispatch(uploadQuestion({docUrl, ...creds}))
        })
    }
    )
}

export const fetchQuestion = (classId) => (dispatch) => {
    dispatch(reqUploadQuestion())
    firestore.collection('questions').where('classId', '==', classId).get()
    .then(snapshot => {
        let questions = []

        snapshot.forEach(doc => {
            const data = doc.data();
            const questionId = doc.id;
            questions.push({questionId, ...data})
        });
        dispatch(uploadQuestionSuccess(questions));
    }).catch(error => {
        dispatch(uploadQuestionFailed(error));
    })
}


// ----------------------------------------------
export const recordClassIdSucess = (cid) => {
    return{
        type: ActionTypes.RECORD_CLASSID,
        cid
    }
}

export const recordQstIdSucess = (qstId) => {
    return{
        type: ActionTypes.RECORD_QSTID,
        qstId
    }
}

export const recordAnsIdSucess = (ansId) => {
    return{
        type: ActionTypes.RECORD_ANSID,
        ansId
    }
}


export const recordIds = (creds) => (dispatch) => {
    if(creds.req === 'classId')
        dispatch(recordClassIdSucess(creds.cid))
    if(creds.req === 'qstId')
        dispatch(recordQstIdSucess(creds.qstId))
    if(creds.req === 'ansId')
        dispatch(recordAnsIdSucess(creds.ansId))
}

// ------------------POST ANSWERS---------

export const reqFetchAnswer = () => {
    return{
        type: ActionTypes.FETCH_ANSWERS_REQUEST
    }
}

export const fetchAnswerSuccess = (answers) => {
    return{
        type: ActionTypes.FETCH_ANSWERS_SUCCESS,
        answers
    }
}

export const fetchAnswerFailed = (error) => {
    return{
        type: ActionTypes.FETCH_ANSWERS_FAILED,
        error
    }
}

export const fetchAnswers = (qstId) => (dispatch) => {
    dispatch(reqFetchAnswer());

    firestore.collection('answers').where('question.questionId', '==', qstId).get()
    .then(snapshot => {
        let answers = []
        snapshot.forEach(doc => {
            const data = doc.data();
            const answerId = doc.id;
            answers.push({answerId, ...data})
        });
        dispatch(fetchAnswerSuccess(answers))
    }).catch(error => {
        dispatch(fetchAnswerFailed(error))
    })
}

export const postAnswer = (creds) => (dispatch) => {
    let videoLink = '';
    if(creds.videoLink != null || creds.videoLink !== undefined)
    {
        videoLink = creds.videoLink
    }
    const votes = 0
    firestore.collection('answers').add({
        description: creds.description,
        fileUrl: creds.fileUrl,
        videoLink: videoLink,
        votes: votes,
        postedBy: {
            user: creds.username,
            id: creds.userId
        },
        question: {
            questionId: creds.qstId,
            title: creds.qstTitle
        },
        voted: []
    }).then(result => {
        dispatch(fetchAnswers(creds.qstId))
        alert('Uploaded successfully');
    }).catch(error => {
        console.log(error);
    })
}

export const uploadAnswerDoc = (creds) => (dispatch) => {

    const uploadTask = firebaseStorage.ref(`answers/${creds.file.name}`).put(creds.file);
    uploadTask.on('state_changed',
    (snapshot) => {
        dispatch(reqUploadFile())
        console.log(snapshot)
    },
    (error) => {
        console.log(error)
    },
    () => {
        dispatch(UploadFileSuccess());
        firebaseStorage.ref('answers').child(creds.file.name).getDownloadURL().then(url => {
            const fileUrl = url;
            dispatch(postAnswer({fileUrl, ...creds}))
        })
    }
    )
}

export const updateVote = (creds) => (dispatch) => {
    let votes;
    const votedList = creds.votedList;
    if(creds.req === 'upvote')
    {
        votes = creds.votes + 1;
    }

    else if(creds.req === 'downvote')
    {
        votes = creds.votes - 1;
    }

    console.log("VOTES>>>>", votes, "BY>>>", creds.votedUser)
    firestore.collection('answers').doc(creds.ansId).update({  
        votes: votes,
        voted: [creds.votedUser, ...votedList]
    }).then(result => {
        dispatch(fetchAnswers(creds.qstId))
    })
}