import { Outlet } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import HeaderSub from "./HeaderSub";


const Dashboard = ()=>{
    // const {user}= useAuth();
    // const navigate =useNavigate();
    return (
      <>
        <HeaderSub />
        <div className="outletContainer">
          <Outlet />
        </div>
      </>
    );
}

export default Dashboard;