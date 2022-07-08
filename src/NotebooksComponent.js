import { Button, Input } from "reactstrap"

const Notebooks = (props)=>{
    return props.notebooks ? (
        <div className="notebooks-div">
                    <h2>Notebooks</h2>
                    {props.notebooks.map(notebook=>{
                        return(
                            <Button>
                                {notebook.title}
                            </Button>

                        )
                    })}
                    <label>Notebook Title:</label>
                    <Input></Input>
                    <Button>Create Notebook</Button>
        </div>
    ) : (
        <></>
    )
}

export default Notebooks