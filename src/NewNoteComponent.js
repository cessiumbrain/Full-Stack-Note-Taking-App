import {Button, Input} from 'reactstrap';
import {useState, useEffect} from 'react'

const NewNote = props =>{


    const [noteTitle, setNoteTitle]= useState(' ')
    const [noteContent, setNoteContent]= useState(' ')

    useEffect(()=>{
        if(props.noteBeingEdited){
            console.log('note being edited')
            setNoteTitle(props.noteBeingEdited.title)
            setNoteContent(props.noteBeingEdited.content)
        } else {
            setNoteTitle(' ')
            setNoteContent(' ')
        }
    })

    return(
        <div className="new-note-div">
            <label>Note Title</label>
            <Input value={noteTitle} onChange={(e)=>{setNoteTitle(e.target.value)}}></Input>
            <label>Note Content</label>
            <Input value={noteContent} onChange={(e)=>{setNoteContent(e.target.value)}}></Input>

            {
                props.noteBeingEdited ? ( 
                    <>
                        <Button>Edit Note</Button>
                        <Button onClick={()=>{props.cancelEdit()}}>Cancel</Button>
                    </>
                ) : ( 
                
                <Button onClick={()=>{
                props.createNote(noteTitle, noteContent)
                setNoteContent(' ')
                setNoteTitle(' ')
                }}>Add Note</Button>)
            }
            

        </div>
        
    )
}

export default NewNote