import { useState } from "react"
import { Button, Input } from "reactstrap"

const Notebooks = (props)=>{
    
    const [notebookTitle, setNotebookTitle] = useState(' ')

    return(
        
        <div className="notebooks-div">
        {props.notebooks ? (
            <div className="notebook-buttons-div">
                    <h2>Notebooks</h2>
                    {props.notebooks.map((notebook)=>{
                        return(
                            <div key={notebook.id}className="individual-notebook-div">
                            <Button onClick={()=>{props.selectNotebook(notebook.id)}} key={notebook.id}>
                                {notebook.title}
                            </Button>
                            <i className="fa-solid fa-trash-can" onClick={()=>{
                                props.setModalStyle({display: 'block'});
                                props.setNotebookToDelete(notebook.id)
                                }}></i>
                            </div>
                            

                        )
                    })}
                    <label>Notebook Title:</label>
                    
                    
            </div> ) : <></> }
       
    <Input value={notebookTitle}onChange={(e)=>{setNotebookTitle(e.target.value)}}></Input>
    <Button
        className="create-notebook-button" 
        onClick={()=>{
            props.createNotebook(notebookTitle)
            setNotebookTitle(' ')
            }}>Create Notebook</Button>
     </div>
    )
   
}

export default Notebooks