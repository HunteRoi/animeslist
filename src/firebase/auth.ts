import firebase from './firebase';
import 'firebase/auth';

const auth = firebase.auth();

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  try {
    await auth.signInWithPopup(provider);
  } catch(err) {
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
  auth,
  signIn,
  signOut
};
