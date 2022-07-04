import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


import Login from './LoginComponent';
import CreateAccount from './CreateAccountComponent';
import Home from './HomeComponent.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'reactstrap';

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

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentNotebook: {}
      
    }
  }

// https://firebase.google.com/docs/web/setup#available-libraries


    firebaseCreateAccount = (email, password)=>{
      console.log(email, password)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.setState({
            currentUser : user.uid
          }, ()=>console.log(this.state.currentUser))

        // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        // ..
      });
    }


  render(){
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    return (
      <div className="App">
       
        <BrowserRouter>
                <Routes>         
                  <Route path='/' element={
                    <Login
                      currentUser={this.state.currentUser}></Login>}/>
                  <Route 
                    path='/createaccount' 
                    element={
                      <CreateAccount
                        currentUser={this.state.currentUser}
                        firebaseCreateAccount={this.firebaseCreateAccount}/>}/>
                  <Route path='/home' element={<Home></Home>}/>
                </Routes>

              
            

        </BrowserRouter>
        <h1>App</h1>
      </div>
    )
  }
}

export default App;
