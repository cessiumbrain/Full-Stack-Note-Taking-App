//React---------->
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//firebase---------->
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, setDoc, doc, getDocs, updateDoc, getDoc, query, where} from'firebase/firestore';
import firebaseConfig from './firebaseConfig';

//other imports---------->
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { v4 as uuidv4 } from 'uuid';

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
        userDocId: ...
      }
      selectedNotebook: 
        {}
      
      */

      
    }
  }
  getUserData=async ()=>{ 
    const q = await query(usersCollection, where('authId', '==', this.state.currentUser.authId));
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
    })
  }
  

  createNotebook= async (title)=>{
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await (await getDoc(docRef)).data();
    const newDoc = {
      ...currentDoc,
      notebooks: currentDoc.notebooks.concat({
        id: uuidv4(),
        title: title,
        notes: [

        ]
      })
    }
    await setDoc(docRef, newDoc)
    //update state to include new notebook
    const updatedDoc = await (await getDoc(docRef)).data()
    console.log(updatedDoc)
    this.setState({
      ...this.state,
      currentUser: { 
        ...this.state.currentUser,
        notebooks: [ ...updatedDoc.notebooks]
      
      }
    }, ()=>console.log(this.state)
    )
  }

  selectNotebook = (notebookId, newTitle) =>{
    //look through the current Users notebooks and pull out the one with the id passed in to this func
    const selectedNotebook = this.state.currentUser.notebooks.find(notebook=>{
      return notebook.id === notebookId
    })
    this.setState({
      ...this.state,
      selectedNotebook: selectedNotebook
    }, ()=>{console.log(this.state)})
  }

  updateNotebook = async () =>{
    //grab user document
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await (await getDoc(docRef)).data();
    console.log(currentDoc)
    //find and replace the given notebook title with new notebook object
  }

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
          //set the current user state as the firebase user id
            this.setState({
              currentUser: {
                ...this.state.currentUser,
                authId: user.uid
              }
            },
            //callback to query user's data from firestore
            ()=>{
              this.getUserData()
            }
            )
            
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
                      //functions
                      firebaseSignout={this.firebaseSignout}
                      createNotebook={this.createNotebook}
                      selectNotebook={this.selectNotebook}  
                      //data
                      selectedNotebook={this.state.selectedNotebook}
                      currentUser={this.state.currentUser}
                      notebooks={this.state.currentUser?.notebooks}
                    />
                    
                  }/>
                </Routes>

              
            

        </BrowserRouter>
        <button onClick={()=>{this.updateNotebook()}}>test</button>
      </div>
    )
  }
}

export default App;
