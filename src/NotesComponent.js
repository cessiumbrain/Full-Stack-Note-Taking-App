import { useState } from "react"
import NewNote from "./NewNoteComponent"

const Notes = props=>{
    if(props.selectedNotebook){
        return(
           <div className="notes-div">
                <h1>{props.selectedNotebook.title}</h1>
                {
                    props.selectedNotebook?.notes.map(note=>{
                        return(


                            <div  className="note-div"key={note.id}>
                            <div>{note.title}</div>
                            <p>{note.content}</p>
                            <i onClick={()=>{props.deleteNote(note.id)}} className="fa-solid fa-trash-can"></i>
                            <i onClick={()=>{
                                props.editNote(note.id)
                            }
                                }className="fa-solid fa-pencil"></i>
                            </div>
                        )
                    })
                }
                <NewNote
                    createNote={props.createNote}
                    noteBeingEdited={props.noteBeingEdited}
                    cancelEdit={props.cancelEdit}
                    updateNote={props.updateNote}
                />
            </div> 
        )
        
    } else {
        return(
            <div className="notes-div">

                    
            </div>
        )
    }
 
}

export default Notes