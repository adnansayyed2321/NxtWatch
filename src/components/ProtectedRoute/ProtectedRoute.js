import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const userToken = Cookies.get("jwt_token")

    return userToken ? <Outlet/> : <Navigate to="login"/>
}   

export default ProtectedRoute