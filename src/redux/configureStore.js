import { createStore, combineReducers, applyMiddleware } from 'redux';
import {LoggingUserInfo} from './loggingUserInfo';
import {Subjects} from './subjects';
import {Classes} from './classes';
import {Topics} from './topics';
import {VideoUpload} from './videoUpload';
import {DocUpload} from './documentUpload';
import {EnrolledCourses} from './enrolledCourse';
import {RecordIds} from './recordIDs';
import {Discuss} from './discussion';
import {Answers} from './answers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const saveToLocalStorage = (state) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e);
    }
}

const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e);
        return undefined
    }
}

const rootReducer = combineReducers({
    LoggingUserInfo: LoggingUserInfo,
    Subjects: Subjects,
    Classes: Classes,
    Topics: Topics,
    VideoUpload: VideoUpload,
    DocUpload: DocUpload,
    EnrolledCourses: EnrolledCourses,
    RecordIds: RecordIds,
    Discuss: Discuss,
    Answers: Answers
})

const persistedState = loadFromLocalStorage();

const Store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk, logger)
);

Store.subscribe(() => saveToLocalStorage(Store.getState()))

export default Store
