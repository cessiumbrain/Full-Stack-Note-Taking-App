import { useEffect } from 'react'
import {Button} from 'reactstrap'
import { useNavigate } from 'react-router'

import Notebooks from './NotebooksComponent'

const Home = (props)=>{

    const navigate = useNavigate()
    //if there's no current user navigate back to login
    useEffect(()=>{
        if(!props.currentUser){
            navigate('/login')
        }
    })
   
    return(
        <div className="home-div">
            <div className='secondary-home-div'>
                <Notebooks
                    notebooks={props.notebooks}
                    createNotebook={props.createNotebook}
                />    
            </div>
            
            <Button onClick={()=>{props.firebaseSignout()}}>Sign Out</Button>
        </div>
    )
}

export default Home