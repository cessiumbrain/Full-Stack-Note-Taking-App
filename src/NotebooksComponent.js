import { useState } from "react"
import { Button, Input } from "reactstrap"

const Notebooks = (props)=>{
    
    const [notebookTitle, setNotebookTitle] = useState('')

    return(
        
        <>
        {props.notebooks ? (
            <div className="notebooks-div">
                    <h2>Notebooks</h2>
                    {props.notebooks.map((notebook)=>{
                        return(
                            <Button onClick={()=>{props.selectNotebook(notebook.id)}} key={notebook.id}>
                                {notebook.title}
                            </Button>

                        )
                    })}
                    <label>Notebook Title:</label>
                    
                    
            </div> ) : <></> }
       
    <Input onChange={(e)=>{setNotebookTitle(e.target.value)}}></Input>
    <Button onClick={()=>{props.createNotebook(notebookTitle)}}>Create Notebook</Button>
     </>
    )
   
}

export default Notebooks