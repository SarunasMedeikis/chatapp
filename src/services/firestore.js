import firebase from "firebase";
import "firebase/firestore";
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
  let currentDate = new Date();
  let hoursMinutes = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  // Add a new message to "messages" collection
  return db
    .collection("messages")
    .doc(`${today}${userName}`)
    .set({
      userName: userName,
      message: message,
      time: hoursMinutes,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const readMessagesStream = (observer) => {
  return db.collection("messages").onSnapshot(observer);
};
