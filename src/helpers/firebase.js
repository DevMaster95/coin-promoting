// JavaScript
// src.firebase.js
import firebase from 'firebase';

// For test
// const firebaseConfig = {
//   apiKey: "AIzaSyAK0eE1uA0Wd_seFD-1HtskoLMTs9ax3ko",
//   authDomain: "web-app-89b45.firebaseapp.com",
//   databaseURL: "https://web-app-89b45-default-rtdb.firebaseio.com",
//   projectId: "web-app-89b45",
//   storageBucket: "web-app-89b45.appspot.com",
//   messagingSenderId: "593772222905",
//   appId: "1:593772222905:web:3da0f03d9f80d80c20be68",
//   measurementId: "G-LKB6VG65ZM"
// }

// For Live
const firebaseConfig = {
  apiKey: 'AIzaSyAxgGc3Z8MCeJ_Z82oMMV4lkMSiPrpKVoM',
  authDomain: 'coinlocator.firebaseapp.com',
  databaseURL: 'https://coinlocator-default-rtdb.firebaseio.com',
  projectId: 'coinlocator',
  storageBucket: 'coinlocator4.appspot.com',
  messagingSenderId: '8352909318',
  appId: '1:83529049318:web:2445b47414b519ef494727',
  measurementId: 'G-L1CJP63Z1Y',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const database = firebase.database();
export const storage = firebase.storage();
