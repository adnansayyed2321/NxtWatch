import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserContext from "./utils/UserContext";
import { useState } from "react";

const Layout = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  return (
    <UserContext.Provider  value={{ loggedInUser, setLoggedInUser }}>
      <div>
        <Header />
        <Outlet />
      </div>
      </UserContext.Provider>
  );
};

// Enable the `v7_startTransition` future flag in `createBrowserRouter`
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          element: <ProtectedRoute/>,
          children: [
            {
              path:"",
              element: <Home/>
            }
          ]
        }
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enable the future flag for React Router v7
    },
  }
);

function App() {
  return(
      <RouterProvider router={router} />
  ) ;
}

export default App;
