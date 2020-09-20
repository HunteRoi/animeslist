## Make it work
In order to be able to use this project, you have to follow these steps:

1) Don't forget to install all dependencies with `npm i`
2) Install the necessary tools with `npm i -g firebase-tools`
3) Login to firebase with `firebase login`
4) Initialize your firestore database with `firebase init firestore`
5) Edit your `firetore.rules` file with your restrictions rules
6) Create a file named `firebase.ts` in the `./src` folder with the following content:
```typescript
import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = { projectId: "YOUR_FIREBASE_PROJECT_ID_HERE" };
firebase.initializeApp(firebaseConfig);

export default firebase;
```
6) Run with `npm start` and enjoy!


## To Do
- finish refactoring with react-bootstrap
- handle types as tags with https://www.npmjs.com/package/react-tag-input