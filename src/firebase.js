import firebase from "firebase";

const fireBase = firebase.initializeApp({
    apiKey: "AIzaSyDBYwgvkQ94_3t6rHK5hrZ1PMuGXDFD0L4",
    authDomain: "instagram-clone-react-3b5f1.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-3b5f1.firebaseio.com",
    projectId: "instagram-clone-react-3b5f1",
    storageBucket: "instagram-clone-react-3b5f1.appspot.com",
    messagingSenderId: "1047791496918",
    appId: "1:1047791496918:web:8176ea62cc2151c853a377",
    measurementId: "G-BQWPCBM705"
});

const db = fireBase.firestore();
const auth = fireBase.auth();
const storage = fireBase.storage();

export {db, auth, storage};

//   export default db;