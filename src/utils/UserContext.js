import {createContext,useState,useEffect} from "react"

export const InitializeContext = createContext()

export const ContextProvider = ({children}) => {
    const[user,setUser] = useState(null)

    useEffect(()=>{
        const storedUser = localStorage.getItem("username")
        if(storedUser){
            setUser(storedUser)
        }
    },[])
    
    return(
        <InitializeContext.Provider value={{user,setUser}}>
            {children}
        </InitializeContext.Provider>
    )

}

// export const UserContext = () => useContext(InitializeContext)

// import { createContext } from "react";

// const UserContext = createContext({
//     loggedInUser:null,
//     setLoggedInUser: () => {}
// })

// export default UserContext


// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create context
// const InitializeContext = createContext();

// // Context Provider component
// export const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const createUser = (data) => {
//     const updatedUsers = [...user, { ...data, id: Date.now() }];
//     setUser(updatedUsers);
//     localStorage.setItem("user", JSON.stringify(updatedUsers));
//   };

//   const updateUser = (id, data) => {
//     const userId = parseInt(id);
//     const updatedUsers = user.map((item) =>
//       item.id === userId ? { ...item, ...data } : item
//     );
//     setUser(updatedUsers);
//     localStorage.setItem("user", JSON.stringify(updatedUsers));
//     setEditIndex(null);
//   };

//   const handleDelete = (id) => {
//     const updatedUsers = user.filter((item) => item.id !== id);
//     setUser(updatedUsers);
//     localStorage.setItem("user", JSON.stringify(updatedUsers));
//   };

//   const removeAllUser = () => {
//     localStorage.removeItem("user");
//     setUser([]);
//   };

//   return (
//     <InitializeContext.Provider
//       value={{
//         user,
//         createUser,
//         updateUser,
//         handleDelete,
//         removeAllUser,
//         setUser,
//         setEditIndex,
//         editIndex,
//       }}
//     >
//       {children}
//     </InitializeContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(InitializeContext);