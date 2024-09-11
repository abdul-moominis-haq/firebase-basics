//Auth importation
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

//Firestore importation
import {initializeApp} from 'firebase/app';

//Firestore documents importation
import {getFirestore, onSnapshot, collection, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc} from 'firebase/firestore';


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
  const auth = getAuth();

  //collection of  references
  const colRef = collection(db, 'books');
   //Query of collected document
   const q = query(colRef, orderBy('createdAt',))

  //get the data from the collection at realtime
const unsubCol = onSnapshot(q, (snapshot) => {
    let books = []
   snapshot.docs.forEach(doc => {
       books.push({...doc.data(), id: doc.id})
   })
    console.log(books)

  })

  //add document to the collection
  const addBookForm = document.querySelector('.add');
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        author: addBookForm.author.value,
        title: addBookForm.title.value,
        createdAt: serverTimestamp()
        
        
    })
    .then(() => {
      addBookForm.reset()
    })
  })

  //delete document from the collection
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
  })

  //get a single document from the collection

  const docRef = doc(db, 'books', '4bKNldoAeTy7I9BK2C0n')
     const unsubDoc =onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id)
    })

    //update document from the collection
    const updateBookForm = document.querySelector('.update');
    updateBookForm.addEventListener('submit', (e) => {
      e.preventDefault()
    const docRef = doc(db, 'books', updateBookForm.id.value)
    updateDoc(docRef, {
      title: "The woman as a castle in the Quran",
    //   updateBookForm.title.value,
    })})

    //signing up users up
    const signUpForm = document.querySelector('.signup');
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = signUpForm.email.value;
      const password = signUpForm.password.value;
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Created", userCredential.user)
        signUpForm.reset()
      })
      .catch((err) => {
        console.log(err.message)
      })
    })

    //loging in and out users
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', () => {
      signOut(auth)
      .then(() => {
        console.log("User Logged out")
      })
      .catch((err) => {
        console.log(err.message)
        })
      
    })

    //loging in users
    const loginForm = document.querySelector('.login');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Logged in", userCredential.user)
        loginForm.reset()
      })
      .catch((err) => {
        console.log(err.message)
      })
    })

    //Subcribe to auth state changes
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if(user){
        console.log("User Logged in Already", user)
      }
    })

    const Unscribe = document.querySelector('.unsub');
    Unscribe.addEventListener('click', () => {
      console.log("Unsubscribing functions")
      unsubCol();
        unsubDoc();
        unsubAuth(); 
      
      
    })