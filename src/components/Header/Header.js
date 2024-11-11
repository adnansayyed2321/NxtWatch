import { LOGO_URL } from "../../utils/constants"
import { useContext } from "react"
import UserContext from "../../utils/UserContext"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const {loggedInUser,setLoggedInUser} = useContext(UserContext)

    const handelLogout = () => {
        Cookies.remove("jwt_token")
        setLoggedInUser(null)
        navigate("/login")
    }

    return (

       
        <div className="px-16 py-4  flex justify-between items-center border-b-2 border-gray-400 fixed w-full">
            <div>
                <img className="w-36" src ={LOGO_URL} alt="nwxtwatch"/>
            </div>
            <div className="flex items-center gap-6">
                {loggedInUser ? <div className="bg-red-500 py-2 px-4 rounded-full shadow-2xl">
                    <p className="text-xl font-bold text-white">{loggedInUser[0].toUpperCase()}</p>
                </div> : <img className="w-11" src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png " alt ="profile"/>}
                <button onClick={handelLogout} className="text-gray-500 font-semibold px-3 py-1 rounded-md border-2 border-gray-400">{loggedInUser ? "Logout" : "Login"}</button>
            </div>
        </div>
    )
}

export default Header