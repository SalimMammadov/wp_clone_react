import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAp_ebMmzLY9ObbJnchbCHTTplVz9iYXFw",
    authDomain: "wp-clone-df4ea.firebaseapp.com",
    databaseURL: "https://wp-clone-df4ea.firebaseio.com",
    projectId: "wp-clone-df4ea",
    storageBucket: "wp-clone-df4ea.appspot.com",
    messagingSenderId: "2655669213",
    appId: "1:2655669213:web:b68b0cd51d063a4c628434"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider} ;
  export default db ;