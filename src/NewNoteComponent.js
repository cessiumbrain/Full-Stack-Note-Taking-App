import {Button, Input} from 'reactstrap';
import {useState} from 'react'

const NewNote = props =>{
    const [noteTitle, setNoteTitle]= useState('')
    const [noteContent, setNoteContent]= useState('')

    return(
        <div className="new-note-div">
            <label>Note Title</label>
            <Input onChange={(e)=>{setNoteTitle(e.target.value)}}></Input>
            <label>Note Content</label>
            <Input onChange={(e)=>{setNoteContent(e.target.value)}}></Input>
            <Button onClick={()=>{props.createNote(noteTitle, noteContent)}}>Add Note</Button>

        </div>
        
    )
}

export default NewNote