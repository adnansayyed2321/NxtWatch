import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {ContextProvider, InitializeContext} from "./utils/UserContext"
import { useContext } from "react";

const Layout = () => {
  const {user} = useContext(InitializeContext)
  console.log(user)

  return (
      <div>
        <Header />
        <Outlet />
      </div>
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
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
      
  ) ;
}

export default App;
