import { useState,useEffect } from "react";
import Header from "./Header";

export default function HeaderSub(){
    const [isMobile,setMobile]=useState(window.innerWidth<768);
    const [open,setOpen]=useState(false);

    useEffect(()=>{
        function handleResize(){
            setMobile(window.innerWidth<768);
            if(window.innerWidth >= 768){
                setOpen(false);
            }
        }
        window.addEventListener("resize",handleResize);
        return ()=>{window.removeEventListener("resize", handleResize);}
        
    },[]);

    if (isMobile === null) {
    return null; 
    }

    return(
        <>
            {isMobile?(
                <>
                    <button onClick={() => setOpen(!open)}>☰</button>
                    {open && (
                        <nav>
                        <a>Home</a> <a>Trips</a> <a>Laundry</a>
                        </nav>
                    )}
                </>
            ):(
                <Header />
            )}
        </>
    )
}

