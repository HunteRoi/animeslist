import * as firebase from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import config from './config';

const app = firebase.initializeApp(config);

const db = getFirestore(app);
const auth = getAuth(app);

const signIn = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        console.error(err);
    }
};

const signOut = async () => {
    try {
        await auth.signOut();
    } catch (err) {
        console.error(err);
    }
};

export {
    app,
    db,
    auth,
    signIn,
    signOut
};
