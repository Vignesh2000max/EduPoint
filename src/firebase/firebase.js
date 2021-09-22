import { config } from './config';
import firebase from 'firebase';

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireauth = firebase.auth;

export const firebaseStorage = firebase.storage();

const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);
export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;