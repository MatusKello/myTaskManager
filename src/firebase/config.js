import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDH66drbNVhK6sVbbqltrUuKgMM4WrkHu4',
  authDomain: 'task-manager-211d2.firebaseapp.com',
  projectId: 'task-manager-211d2',
  storageBucket: 'task-manager-211d2.appspot.com',
  messagingSenderId: '652600653160',
  appId: '1:652600653160:web:a4c1b639210b5bba2a52dd',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
