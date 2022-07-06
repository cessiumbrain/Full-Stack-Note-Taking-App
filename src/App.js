//React---------->
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//firebase---------->
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, setDoc, doc, getDocs} from'firebase/firestore';

//other imports---------->
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


//components---------->
import Login from './LoginComponent';
import CreateAccount from './CreateAccountComponent';
import Home from './HomeComponent.js'

import { Nav } from 'reactstrap';

//firebase config---------->
const firebaseConfig = {
  apiKey: "AIzaSyBetrkRoCXJmPTUhEy3ZwFow5YxUL2zEm4",
  authDomain: "note-taking-app-b.firebaseapp.com",
  projectId: "note-taking-app-b",
  storageBucket: "note-taking-app-b.appspot.com",
  messagingSenderId: "12758433387",
  appId: "1:12758433387:web:8425c9dbe23aa5da47bb2e",
  measurementId: "G-FXSN9FZ76Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db= getFirestore(app)
const usersCollection = collection(db, 'Users')

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      //currentUser: number
      currentNotebook: {}
      
    }
  }
  getUserData=async ()=>{
    const snapshot = await getDocs(usersCollection)
      const users = snapshot.docs.map(doc=>{
        return doc.data()
      })
      const currentUser = users.find(user=>{
        return user.id === this.state.currentUser
      })   
      console.log(currentUser)
    }
  

  createNotebook= async ()=>{
    const docs = await getDocs(usersCollection)
    console.log(docs)
  }
  createNewUser = async ()=>{
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  firebaseCreateAccount = (email, password)=>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user.uid)
          this.setState({
            currentUser : user.uid
          }, //callback to create user document in firestore db
          async ()=>{
            const docRef = await addDoc(collection(db, "Users"), {
              id: user.uid,
              email: user.email
            });
            console.log(`document created ${docRef}`);
          })
        // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        // ..
      });
  }
  firebaseLogin = (email, password)=>{
      signInWithEmailAndPassword(auth, email, password)
        //if sign in works...
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          //set the current user state as the firebase user id
            this.setState({
              currentUser: user.uid
            })
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  }
  firebaseSignout = ()=>{
      signOut(auth).then(() => {
        this.setState({
          currentUser: null
        }, ()=>{console.log(this.state.currentUser)})
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });
  }

  render(){
  
    return (
      <div className="App">
       
        <BrowserRouter>
                <Routes>         
                  <Route path='/login' element={
                    <Login
                      firebaseLogin={this.firebaseLogin}
                      currentUser={this.state.currentUser}/>}/>
                  <Route 
                    path='/create-account' 
                    element={
                      <CreateAccount
                        currentUser={this.state.currentUser}
                        firebaseCreateAccount={this.firebaseCreateAccount}/>}/>
                  <Route path='/home' index element={
                    <Home
                      currentUser={this.state.currentUser}
                      firebaseSignout={this.firebaseSignout}/>}/>
                </Routes>

              
            

        </BrowserRouter>
        <h1>App</h1>
        <button onClick={()=>{this.getUserData()}}>test</button>
      </div>
    )
  }
}

export default App;
