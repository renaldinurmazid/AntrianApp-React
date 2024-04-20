// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMYAx5SxgBbLAI-wFamQCsobj_SXmPmi4",
  authDomain: "db-antrian-react.firebaseapp.com",
  projectId: "db-antrian-react",
  storageBucket: "db-antrian-react.appspot.com",
  messagingSenderId: "469459107019",
  appId: "1:469459107019:web:25a50c3c6c61d0f6f7ef4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db