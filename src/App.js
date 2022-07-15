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
import { uid } from 'uid';


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
    }, 
    //if there is a selected notebook- we wait for the state to be update before selecting it again to grab new data
    ()=>{
      if(this.state.selectedNotebook){
        this.selectNotebook(this.state.selectedNotebook.id)
      }
    })
  }
  
  //notebooks
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

  selectNotebook = (notebookId) =>{
    //look through the current Users notebooks and pull out the one with the id passed in to this func


    const selectedNotebook = this.state.currentUser.notebooks.find(notebook=>{
      return notebook.id === notebookId
    })

    this.setState({
      ...this.state,
      selectedNotebook: selectedNotebook
    })
  }

  updateNotebookTitle = async () =>{
    //grab user document
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await (await getDoc(docRef)).data();
    console.log(currentDoc)
    //find and replace the given notebook title with new notebook object
  }

  deleteNotebook = async (notebookId) =>{
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await (await getDoc(docRef)).data();

    //remove notebook from currentDoc's notebook array
    const newNotebooksArray = currentDoc.notebooks.filter(notebook=>notebook.id!==notebookId)
    console.log(newNotebooksArray)
    updateDoc(docRef, {
      notebooks: newNotebooksArray
    })
    this.getUserData()
  }

  //notes

  editNote = (noteId) =>{
    //grab note object 
    const noteObj = this.state.selectedNotebook.notes.find(note=>{
      return note.id === noteId
    })

    this.setState({
      noteBeingEdited: noteObj 
    }, ()=>{console.log(this.state.noteBeingEdited)})
  }

  cancelEdit  = () =>{
    this.setState({
      noteBeingEdited : null
    })
  }
  createNote = async (noteTitle, noteContent) =>{
  const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
  const currentDoc = await(await getDoc(docRef)).data();
  //reference the current notebook object
  const currentNotebook = currentDoc.notebooks.find(notebook=>{
    return notebook.id === this.state.selectedNotebook.id
  })
  //create the new notebook object by spreading the old one then concatinating the new note into the notes array
  const newNotebook = {
    ...currentNotebook,
    notes: currentNotebook.notes.concat({
      title: noteTitle,
      content: noteContent,
      id: uuidv4()

    })
  }
  //find the index of the notebook to replace by id
  const replacingIndex = currentDoc.notebooks.findIndex(notebook=>{
    return notebook.id === this.state.selectedNotebook.id 
  })
  //mutate the notebooks array by splicing in the new notebook object create above
  currentDoc.notebooks.splice(replacingIndex, 1, newNotebook)

  //update the document in firestore
  const newDoc = await updateDoc(docRef, {
    notebooks: [
      ...currentDoc.notebooks
    ]
  })
  //update state by calling the get userData function again
  this.getUserData()

  }
  updateNote = async (noteTitle, noteContent)=>{
    console.log(noteTitle, noteContent)
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await (await getDoc(docRef)).data();

   
    //find the note being edited
    const currentNoteObject = this.state.selectedNotebook.notes.find(note=>{
     return note.id === this.state.noteBeingEdited.id
    })

    const newNoteObject = {
      ...currentNoteObject,
      noteTitle: noteTitle,
      noteContent: noteContent
    }
    console.log(newNoteObject)
  }

  deleteNote = async (noteId) =>{
    const docRef = await doc(db, 'Users', this.state.currentUser.documentId)
    const currentDoc = await(await getDoc(docRef)).data();
    //reference the current notebook object
    const currentNotebook = currentDoc.notebooks.find(notebook=>{
      return notebook.id === this.state.selectedNotebook.id
    })
    const notesReplacingIndex = currentNotebook.notes.findIndex(note=>{
      return note.id ===noteId
    })
    //mutate the current notebook's notes array
    currentNotebook.notes.splice(notesReplacingIndex, 1)
    //find the index of the notebook to splice
    const notebooksReplacingIndex = currentDoc.notebooks.findIndex(notebook=>{
      return notebook.id === currentNotebook.id
    })
    currentDoc.notebooks.splice(notebooksReplacingIndex, 1, currentNotebook)
    //update the document
    await updateDoc(docRef, {
      notebooks: currentDoc.notebooks
    })
    this.getUserData()
  }

  //firebase
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
                      deleteNotebook={this.deleteNotebook}
                      editNote={this.editNote}
                      createNote={this.createNote}  
                      deleteNote={this.deleteNote}
                      cancelEdit={this.cancelEdit}
                      updateNote={this.updateNote}
                      //data
                      selectedNotebook={this.state.selectedNotebook}
                      currentUser={this.state.currentUser}
                      notebooks={this.state.currentUser?.notebooks}
                      noteBeingEdited={this.state.noteBeingEdited}
                    />
                    
                  }/>
                </Routes>

              
            

        </BrowserRouter>
        <button onClick={()=>{this.createNote('xxxx', 'xxxx')}}>test</button>
      </div>
    )
  }
}

export default App;
