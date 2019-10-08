import firebase from 'firebase';
    const firebaseConfig = {
      apiKey: "AIzaSyDSggBWuYmS7bZa-KkrdPfMPOEhPZStD2c",
      authDomain: "react-native-app-a701f.firebaseapp.com",
      databaseURL: "https://react-native-app-a701f.firebaseio.com",
      projectId: "react-native-app-a701f",
      storageBucket: "react-native-app-a701f.appspot.com",
      messagingSenderId: "518591882883",
      appId: "1:518591882883:web:b5c913b81b5f425b"
    };  
      // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 export const f=firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  
  