import { useState } from 'react'
import {Button, Input} from 'reactstrap'
import { NavLink } from 'react-router-dom'

const Login = (props)=>{
    
    return(
        <div className="login-div">
            <h2>Login</h2>
            <label>username/email</label>
            <Input className='username-input'></Input>
            <label>password</label>
            <Input className='password-input'></Input>
            <Button>Login</Button>
            <NavLink to='/createaccount'>
                <Button>Create Account</Button>
            </NavLink>
            <Button>Test Drive without An Account</Button>
            <label>Login with:</label>
        </div>
    )
}

export default Login