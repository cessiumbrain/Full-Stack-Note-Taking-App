//React---------->
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//firebase---------->
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, setDoc, doc, getDocs, getDoc, query, where} from'firebase/firestore';
import firebaseConfig from './firebaseConfig';

//other imports---------->
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


//components---------->
import Login from './LoginComponent';
import CreateAccount from './CreateAccountComponent';
import Home from './HomeComponent.js'

import { Nav } from 'reactstrap';


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
      /*currentUser:{
        id:...
        email...
        notebooks:
      }
      selectedNotebook: 
        {}
      
      */
      currentNotebook: {}
      
    }
  }
  getUserData=async ()=>{
    const q = await query(usersCollection, where('authId', '==', this.state.currentUser.authId));
    console.log(q)
    const querySnapshot = await getDocs(q)
    const currentUserData = querySnapshot.docs[0].data()
    const currentUserDocumentId = querySnapshot.docs[0].id
    this.setState({
      currentUser:{
        ...this.state.currentUser,
        notebooks: currentUserData.notebooks,
        documentId : currentUserDocumentId,
        currentUserEmail : currentUserData.email
      }
      

    }, ()=>console.log(this.state))

    
    
    // getDoc(q).then(document=>{console.log(document)})
    

  }
  

  createNotebook= async ()=>{
    const docs = await getDocs(usersCollection)
    console.log(docs)
  }
  // createNewUser = async ()=>{
  //   try {
  //     const docRef = await addDoc(collection(db, "Users"), {
  //       userId: this.state.currentUser
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }
  firebaseCreateAccount = (email, password)=>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.setState({
            currentUser : {
              ...this.state.currentUser,
              authId: user.uid

            }
          }, //callback to create user document in firestore db
          async ()=>{
            const docRef = await addDoc(collection(db, "Users"), {
              authId: user.uid,
              email: user.email
            });
            //set state with document ID for the new user
            this.setState({
              currentUser: {
                ...this.state.currentUser,
                userDocId: docRef.id
              }
            }, ()=>console.log(this.state))
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
              currentUser: {
                ...this.state.currentUser,
                authId: user.uid
              }
            }, ()=>{
              console.log(this.state)
            })
            //then get set the user's data in state
            // ()=>{this.getUserData()})
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
                      firebaseSignout={this.firebaseSignout}
                      notebooks={this.state.notebooks}
                      createNotebook={this.createNotebook}  
                    />
                    
                  }/>
                </Routes>

              
            

        </BrowserRouter>
        <button onClick={()=>{this.getUserData()}}>test</button>
      </div>
    )
  }
}

export default App;
