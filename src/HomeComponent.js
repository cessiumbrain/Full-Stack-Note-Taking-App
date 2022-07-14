import { useEffect, useState } from 'react'
import {Button} from 'reactstrap'
import { useNavigate } from 'react-router'

import Notebooks from './NotebooksComponent'
import Notes from './NotesComponent'

const Home = (props)=>{

    const navigate = useNavigate()
    //if there's no current user navigate back to login
    useEffect(()=>{
        if(!props.currentUser){
            navigate('/login')
        }
    })

    const [modalStyle, setModalStyle] = useState({display: 'none'})
    const [notebookToDelete, setNotebookToDelete] = useState('')
    return(
        <div className="home-div">
            <div className='secondary-home-div'>
                <div className="modal-div" style={modalStyle}>
                    <div className='inner-modal-content'>
                         are you sure you want to delete this notebook?
                         <Button onClick={()=>{
                            props.deleteNotebook(notebookToDelete)
                            setModalStyle({display: 'none'})
                            }}>
                            Confirm
                         </Button>
                         <Button onClick={()=>{setModalStyle({display: 'none'})}}>Cancel</Button>
                    </div>
                   
                </div>
                <Notebooks
                    modalStyle={modalStyle}
                    setModalStyle={setModalStyle}
                    setNotebookToDelete={setNotebookToDelete}
                    notebooks={props.notebooks}
                    createNotebook={props.createNotebook}
                    selectNotebook={props.selectNotebook}

                />
                <Notes
                    //functions
                    createNote={props.createNote}
                    deleteNote={props.deleteNote}
                    editNote={props.editNote}
                    cancelEdit={props.cancelEdit}
                    //data
                    selectedNotebook={props.selectedNotebook}    
                    noteBeingEdited={props.noteBeingEdited}
                    
                    />
            </div>
            
            <Button onClick={()=>{props.firebaseSignout()}}>Sign Out</Button>
        </div>
    )
}

export default Home