const Notes = props=>{
    return(
        <div className="notes-div">
            {
                props.selectedNotebook ? (<h1>{props.selectedNotebook.title}</h1>) : (<></>)
            }
            
        </div>
    )
}

export default Notes