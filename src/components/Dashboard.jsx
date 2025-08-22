import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import HeaderSub from "./HeaderSub";


const Dashboard = ()=>{
    const {user}= useAuth();
    const navigate =useNavigate();
    return (
      <>
        {/* <div>Cirrusview</div> */}
        <HeaderSub />

        <div>
          <span>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Dashboard
            </button>
          </span>
          <span>
            <button
              onClick={()=>{
                navigate("/createLaundry");
              }}>Set Laundry</button>
          </span>
          <span>
            <button
              onClick={() => {
                navigate("/laundry");
              }}
            >
              View Laundry
            </button>
          </span>
          <span>
            <button>Log Laundry</button>
          </span>
          {!user && (
            <>
              <span>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </span>
              <span>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
              </span>
            </>
          )}
          {user && (
            <>
              <span>
                <button
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Log out
                </button>
              </span>
            </>
          )}
        </div>

        <div className="outletContainer">
          <Outlet />
        </div>
      </>
    );
}

export default Dashboard;