import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log(db);

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const addMessage = (userName, message) => {
  let today = Date.now().toString();
  // Add a new message to "messages" collection
  return db
    .collection("messages")
    .doc(`${today}${userName}`)
    .set({
      message: message,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
