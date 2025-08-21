
import { useState,useEffect } from 'react';
import Bulb from './icons/bulb';
import { useAuth } from './AuthContext';


const Header=()=>{
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

    return(
    <>
        <div className='headerCollection'>
            <div className='headerLeft'>
                <div className='headerTitle'>Cirrus View</div>
            </div>
            <div className='headerRight'>
                <div>
                    {user?.user ? `Hi ${user.user.username}` : "You are not logged in"}
                </div>
                <div className='' style={{ padding: "1rem" }}>
                    <button className='themeButtonContainer' onClick={toggleTheme}>
                    
                    <Bulb className="iconTheme" />
            

                    </button>
                </div>
            </div>

        </div>
    </>
    )
}

export default Header;