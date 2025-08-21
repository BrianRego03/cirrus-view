import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './components/Routers'
import { useState,useEffect } from 'react';
import Bulb from './components/icons/bulb';

function App() {

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
      <div className='' style={{ padding: "1rem" }}>
        <button className='themeButtonContainer' onClick={toggleTheme}>
          
          <Bulb className="iconTheme" />
  

        </button>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
