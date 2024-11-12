import { LOGO_URL } from "../../utils/constants"
import Cookies from "js-cookie"
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { InitializeContext } from "../../utils/UserContext";

const Header = () => {
    const navigate = useNavigate()
    const {user,setUser} = useContext(InitializeContext)
 

    const handelLogout = () => {
        localStorage.removeItem("username")
        setUser(null)
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    return (

       
        <div className="bg-white md:px-16 md:py-4 px-4 py-2 flex justify-between items-center border-b-2 border-gray-400 fixed w-full  ">
            <div>
                <Link to="/"><img className="md:w-36 w-24" src ={LOGO_URL} alt="nwxtwatch"/></Link>
                
            </div>
            <div className="flex items-center md:gap-4 gap-2">
                {user ? <div className="bg-red-500 md:py-2 py-1 px-3 md:px-4 rounded-full shadow-2xl">
                    <p className="md:text-xl text-md font-bold text-white">{user[0].toUpperCase()}</p>
                </div> : <img className="md:w-11 w-8" src = "https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png " alt ="profile"/>}
                <button onClick={handelLogout} className="text-gray-500 font-semibold md:px-3 px-2 text-sm md:text-base py-1 rounded-md border-2 border-gray-400">{user ? "Logout" : "Login"}</button>
            </div>
        </div>
    )
}

export default Header