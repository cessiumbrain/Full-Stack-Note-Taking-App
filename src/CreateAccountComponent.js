
import {useState} from 'react'
import {Input, Button} from 'reactstrap'
import { useNavigate } from 'react-router'


const CreateAccount = (props)=>{
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [reenterPassword, setReenterPassword] = useState('')
    const navigate = useNavigate()

    console.log(props)
    if(props.currentUser){
        console.log('currentUser')
        navigate('/home', { replace: true })
    }

    const validatePassword = () =>{

    }
    return(
        <div class="create-account-div">
            <label>email</label>
            <Input onChange={(e)=>{setEmail(e.target.value)}}></Input>
            <label>password</label>
            <Input onChange={(e)=>{setPassword(e.target.value)}}></Input>
            <label>Re-Enter Password</label>
            <Input onChange={(e)=>{setReenterPassword(e.target.value)}}></Input>
            <Button onClick={()=>{props.firebaseCreateAccount(email, password)}}>Create Account</Button>
        </div>
    )
}

export default CreateAccount