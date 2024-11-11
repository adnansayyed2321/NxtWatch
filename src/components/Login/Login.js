import { useContext, useState } from "react";
import { LOGIN_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { LOGO_URL } from "../../utils/constants";
import UserContext from "../../utils/UserContext";

const Login = () => {
    const [username,setUserName] = useState("")
    const [password,setUserPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [showError,setShowError] = useState(false)
    const [validationProcess,setValidationProcess] = useState(false)

    const navigate = useNavigate()
    const {setLoggedInUser} = useContext(UserContext)

    const getAllDetaials = async (event) => {
        event.preventDefault();
        setShowError(false)
        setValidationProcess(true)
        // console.log("proceessing")

        const userDetails = {username,password}
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        }
        try {
            const response = await fetch(LOGIN_URL,options)
            const data = await response.json()
            // console.log(data)
            // console.log(response.ok)
            if(response.ok){
                Cookies.set("jwt_token",data.jwt_token,{
                    expires:30,
    
                })
                
                setLoggedInUser(username)
                navigate("/")
            }
            else{
                setErrorMessage(data.error_msg)
                setShowError(true)
            }
        }catch  {
            setErrorMessage("An error occurred. Please try again.");
            setShowError(true);
        }finally{
            setValidationProcess(false)
        }

        // console.log(username)
        // console.log(password)
        // console.log(showPassword)
    }

    return (
        <div className="bg-slate-100 w-full h-screen flex flex-col justify-center items-center">
            <div className="bg-white flex flex-col md:px-8 py-6 px-4 justify-center items-start gap-6 w-72 md:w-96 rounded-xl shadow-2xl">
                <img className="md:w-48 w-40 mx-auto my-8" src = {LOGO_URL} alt = "nxtwatch"/>
                <form className="w-full flex flex-col items-center justify-center gap-3" onSubmit={getAllDetaials}>
                    <div className="flex flex-col w-full gap-1">
                        <label className="md:text-sm text-xs font-semibold text-gray-700" htmlFor="username">USERNAME</label>
                        <input required className="w-full border-2 border-gray-400 rounded-md py-1 px-2" id ="username" type="text" value={username} onChange={(e)=>(setUserName(e.target.value))}/>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="md:text-sm text-xs font-semibold text-gray-700" htmlFor="password">PASSWORD</label>
                        <input required className="w-full border-2 border-gray-400 rounded-md py-1 px-2" id ="password" type={showPassword ? "text" : "password"} value={password} onChange={(e)=>(setUserPassword(e.target.value))}/>
                    </div>
                    <div className="flex justify-start items-center w-full gap-1">
                        <input id ="showPasscode" type="checkbox" checked={showPassword} onChange={(e) => (setShowPassword(e.target.checked))}/>
                        <label className="md:text-sm text-xs font-semibold text-gray-700" htmlFor="showPasscode">Show Password</label>
                    </div>
                    <button className="bg-blue-500 text-white w-full flex justify-center items-center p-1 my-2 rounded-lg">Login</button>
                </form>
                {showError && <p className="w-full text-center font-semibold text-red-700">{errorMessage}</p>}
                {validationProcess && <p className="md:text-sm text-xs w-full text-center font-semibold text-gray-700">Please Wait ...</p>}
            </div>
        </div>
    )
}

export default Login