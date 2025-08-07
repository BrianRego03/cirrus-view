import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Dashboard />,
    },
    {
        path:"/signup",
        element: <SignUp />,
    },
]);

export default router;