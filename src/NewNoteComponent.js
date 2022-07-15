import {Button, Input} from 'reactstrap';
import {useState, useEffect, useRef} from 'react'

const NewNote = props =>{

    const noteTitleRef = useRef('')
    const noteContentRef = useRef('')

    useEffect(()=>{
        if(props.noteBeingEdited){
            noteTitleRef.current.value= props.noteBeingEdited.title
            noteContentRef.current.value = props.noteBeingEdited.content
        }
    })
    
    const clearInputs = () =>{
        noteTitleRef.current.value = ''
        noteContentRef.current.value=''
    }
    
 

   

    return(
        <div className="new-note-div">
            <label>Note Title</label>
            <input ref={noteTitleRef} ></input>

            <label>Note Content</label>
            <input ref={noteContentRef}></input>

            {
                props.noteBeingEdited ? ( 
                    <>
                        <Button onClick={()=>{props.updateNote(noteTitleRef.current.value, noteContentRef.current.value, props.noteBeingEdited.id)}}>Edit Note</Button>
                        <Button onClick={()=>{props.cancelEdit(); clearInputs()}}>Cancel</Button>
                    </>
                ) : ( 
                
                <Button onClick={()=>{
                props.createNote(noteTitleRef.current.value, noteContentRef.current.value)
                clearInputs()
                }}>Add Note</Button>)
            }
            

        </div>
        
    )
}

export default NewNote