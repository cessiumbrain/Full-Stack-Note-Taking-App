import { useNavigate } from "react-router"
import { useEffect } from "react"

const RootNav = (props) =>{

    const navigate = useNavigate()

    useEffect(()=>{
        if(props.currentUser) {
            navigate('/home')
        } else {
            navigate('/login')
        }
    })


    return(
        <></>
    )
}

export default RootNav