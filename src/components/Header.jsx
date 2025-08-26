
import { useState,useEffect } from 'react';
import Bulb from './icons/Bulb';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from './icons/LogoutIcon';
import AccountIcon from './icons/AccountIcon';
import SignUpIcon from './icons/SignUpIcon';
import LoginIcon from './icons/LogInIcon';
import LaundryIcon from './icons/LaundryIcon';
import TripIcon from './icons/TripIcon';
import Stars from './icons/Stars';


const Header=()=>{
    const navigate=useNavigate();
    const {user}= useAuth();
    const [theme, setTheme] = useState(
        document.documentElement.getAttribute("data-theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    };

    return (
      <>
        <div className="headerCollection">
          <div className="headerLeft">
            <div className="headerTitle" onClick={()=>{navigate("/")}}>Cirrus View</div>
          </div>
          <div className="headerRight">
            <div className="accountStatus">
              <div onClick={()=>{navigate("/laundry")}}>
                <button className="themeButtonContainer" >
                  <Stars className="iconTheme" />
                </button>
                Stargazing
              </div>  
              <div onClick={()=>{navigate("/trip")}}>
                <button className="themeButtonContainer" >
                  <TripIcon className="iconTheme" />
                </button>
                Day Trip
              </div>  
              <div onClick={()=>{navigate("/laundry")}}>
                <button className="themeButtonContainer" >
                  <LaundryIcon className="iconTheme" />
                </button>
                Laundry
              </div>  
              <div onClick={toggleTheme}>
                <button className="themeButtonContainer" >
                  <Bulb className="iconTheme" />
                </button>
                {theme === "light" ? "Dark" : "Light"}
              </div>
            </div>
            <div className="accountStatus">
              {user?.user ? (
                <>
                  <div>
                    <button className="themeButtonContainer">
                      <AccountIcon className="iconTheme" />
                    </button>
                      <span className='nameLimiter'>{user.user.username}</span>
                  </div>
                  <div
                    onClick={() => {
                      navigate("/logout");
                    }}
                  >
                    <button className="themeButtonContainer">
                      <LogoutIcon className="iconTheme" />
                    </button>
                    <span>Log Out</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    <button className="themeButtonContainer">
                      <SignUpIcon className="iconTheme" />
                    </button>
                    <span>Sign Up</span>
                  </div>
                  <div
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <button className="themeButtonContainer">
                      <LoginIcon className="iconTheme" />
                    </button>
                    <span>Log in</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default Header;