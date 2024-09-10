import {initializeApp} from 'firebase/app';
import {getFirestore,getDocs, collection} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBSVBRpjR2FWWMduxzpR-a0sXhvOarT3zA",
    authDomain: "fir-backend-b4d28.firebaseapp.com",
    projectId: "fir-backend-b4d28",
    storageBucket: "fir-backend-b4d28.appspot.com",
    messagingSenderId: "185041421399",
    appId: "1:185041421399:web:971a8197da05e496988f12"
  };
  //innitialize firebase
  initializeApp(firebaseConfig);


//initilizing  services
  const db = getFirestore();



  //collection of  references
  const colRef = collection(db, 'books');

  //get the data from the collection
  getDocs(colRef).then((snapshot) => {
   let books = []
   snapshot.docs.forEach(doc => {
       books.push({...doc.data(), id: doc.id})
   })
    console.log(books)
  })
  .catch((err) => {
    console.log(err.message);
  });