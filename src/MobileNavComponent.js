import {useState} from 'react'


const MenuNotebooks = (props)=>{
    return(
        <>
        <h2>Notebooks</h2>
        {props.notebooks ? (
            props.notebooks.map(notebook=>{
                return(
                        <div className="menu-notebook-div" key={notebook.id} onClick={()=>{props.selectNotebook(notebook.id)}}>
                            {notebook.title}
                            </div>

                    
                )
            })
        ) : '' }
        </>
        
        
    )
}

const MobileNav = (props) =>{
    const [navStyle, setNavStyle] = useState({
        display: 'none'
    })
    return(
        <div className="mobile-nav">
            <div className="menu-bar">
                <i className="fa-solid fa-bars" onClick={()=>{
                    if(navStyle.display==='none'){
                        setNavStyle({
                            display: 'block'
                        })

                    } else {
                        setNavStyle({
                            display: 'none'
                        })
                    }
                   }}
                >
                </i>
            </div>
            <div style={navStyle} className="mobile-nav-dropdown">

                <MenuNotebooks 
                selectNotebook={props.selectNotebook}
                notebooks={props.notebooks}></MenuNotebooks>
            </div>
        </div>
    )
}

export default MobileNav