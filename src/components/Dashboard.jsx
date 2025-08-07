import { Outlet, useNavigate } from "react-router-dom";




const Dashboard = ()=>{
    
    const navigate =useNavigate();
    return (
      <>
        <div>Cirrusview</div>
        <div>
          <span>
            <button>Set Windows</button>
          </span>
          <span>
            <button>View Window status</button>
          </span>
          <span>
            <button>Log Laundry</button>
          </span>
          <span>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </span>
        </div>
        <div className="outletContainer">
              <Outlet />
        </div>

        
      </>
    );
}

export default Dashboard;