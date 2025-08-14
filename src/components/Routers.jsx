import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Laundry from "./Laundry";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard />,
        children:[
            {path:"/laundry", element: <Laundry />},
            // {path:"catalog",element: <Catalog />},
            // {path:"checkout", element:<Checkout />}
        ],
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