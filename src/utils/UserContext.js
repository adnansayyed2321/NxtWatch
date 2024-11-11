import { createContext } from "react";

const UserContext = createContext({
    loggedInUser:null,
    setLoggedInUser: () => {}
})

export default UserContext