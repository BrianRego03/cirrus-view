import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Laundry from "./Laundry";
import LaundrySolo from "./LaundrySolo";
import LaundrySoloReport from "./LaundrySoloReport";
import CreateLaundry from "./CreateLaundry";
import Trip from "./Trip";
import TripSolo from "./TripSolo";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard />,
        children:[
            {path:"/laundry", element: <Laundry />},
            {path:"/laundry/:id", element: <LaundrySolo />},
            {path:"/laundry/:id/report", element: <LaundrySoloReport />},
            {path:"/createLaundry", element: <CreateLaundry />},
            {path:"/trip", element: <Trip />},
            {path:"/trip/:id", element: <TripSolo />},
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