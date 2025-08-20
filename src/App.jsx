import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './components/Routers'
import { useState,useEffect } from 'react';

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
      <div style={{ padding: "1rem" }}>
        <button onClick={toggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <p>Current theme: {theme}</p>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
