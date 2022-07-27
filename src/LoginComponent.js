import { useState, useEffect } from 'react'
import {Button, Input} from 'reactstrap'
import { NavLink, useNavigate} from 'react-router-dom'



const Login = (props)=>{

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('')
    const [validationError, setValidationError] = useState('')

   const navigate = useNavigate();
   useEffect(()=>{

    if(props.currentUser){
        navigate('/home', {replace: true})
    }
   }) 

   const validateForm = () =>{
    if(username===''){
        setValidationError('please enter a username')
    } else if(password==='') {
        setValidationError('please enter a password')
    } else {
        setValidationError('')
        props.firebaseLogin()
    }

   }
    
   if(props.errors?.login){
    console.log(props.errors.login)
   }
    return(
        <div className="login-div">
            <h2>Login</h2>
            <label>username/email</label>
            <Input value={username} onChange={(e)=>{setUsername(e.target.value)}}className='username-input'></Input>
            <label>password</label>
            <Input value={password} onChange={(e)=>{setPassword(e.target.value)}}className='password-input'></Input>
            <Button onClick={()=>{
                validateForm()
                }}>Login</Button>
            <NavLink to='/create-account'>
                <Button>Create Account</Button>
            </NavLink>
            <label>Login with:</label>
            <Button onClick={()=>props.firebaseGoogleAuth()}>
                <i className="fa-brands fa-google" ></i>
                </Button>
            
            {/* <label>Report a Bug</label>
            <Button onClick={()=>{}}>
                <i className="fa-solid fa-bug" ></i>
            </Button> */}

            {props.errors?.login ? <p className='error-text'>{props.errors.login}</p> : ''}
            {validationError ? <p className='error-text'>{validationError}</p> : ''}
            
        </div>
    )
}

export default Login