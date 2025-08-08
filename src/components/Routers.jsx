import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard />,
    },
    {
        path:"/signup",
        element: <SignUp />,
    },
    {
        path:"/login",
        element: <LogIn />
    },
    {
        path:"/logout",
        element: <LogOut />
    },
]);

export default router;