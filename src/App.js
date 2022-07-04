//React---------->
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//firebase---------->
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut } from "firebase/auth";

//other imports---------->
import axios from 'axios';

//components---------->
import Login from './LoginComponent';
import CreateAccount from './CreateAccountComponent';
import Home from './HomeComponent.js'
import 'bootstrap/dist/css/bootstrap.min.css';
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

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentNotebook: {}
      
    }
  }

  createNewUser = ()=>{
    axios({
      method: 'post',
      body: 'hello',
      url: `http://localhost:5000/${this.state.currentUser}/notebooks`
    })
  }
  firebaseCreateAccount = (email, password)=>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          // Signed in 
          const user = userCredential.user;
          console.log(user.uid)
          this.setState({
            currentUser : user.uid
          })
          //create new user in database
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
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          this.setState({
            currentUser: user.uid
          }, ()=>{console.log(this.state.currentUser)})
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
                  <Route path='/home' element={
                    <Home
                      currentUser={this.state.currentUser}
                      firebaseSignout={this.firebaseSignout}/>}/>
                </Routes>

              
            

        </BrowserRouter>
        <h1>App</h1>
        <button onClick={()=>{this.createNewUser()}}>test</button>
      </div>
    )
  }
}

export default App;
