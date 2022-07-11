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
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            </div>
                        )
                    })
                }
                <NewNote
                    createNote={props.createNote}
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