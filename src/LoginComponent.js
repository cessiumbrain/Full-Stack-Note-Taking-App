import { useState, useEffect } from 'react'
import {Button, Input} from 'reactstrap'
import { NavLink, useNavigate} from 'react-router-dom'



const Login = (props)=>{

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('')

   const navigate = useNavigate();
   useEffect(()=>{
    if(props.currentUser){
        navigate('/home', {replace: true})
    }
   }) 
    
    return(
        <div className="login-div">
            <h2>Login</h2>
            <label>username/email</label>
            <Input onChange={(e)=>{setUsername(e.target.value)}}className='username-input'></Input>
            <label>password</label>
            <Input onChange={(e)=>{setPassword(e.target.value)}}className='password-input'></Input>
            <Button onClick={()=>{props.firebaseLogin(username, password)}}>Login</Button>
            <NavLink to='/create-account'>
                <Button>Create Account</Button>
            </NavLink>
            <Button>Test Drive without An Account</Button>
            <label>Login with:</label>
        </div>
    )
}

export default Login