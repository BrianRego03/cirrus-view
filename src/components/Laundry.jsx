import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import LaundryBasket from "./LaundryBasket";



const Laundry = ()=>{
    // const {user}= useAuth();
    const [loadingLaundry,setLaundry]=useState(null);
    const navigate = useNavigate();

    const fetchAllLaundry= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/laundry`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
              console.log(data);
              setLaundry(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
          })();
        },[]);

    useEffect(()=>{
        fetchAllLaundry();
    },[fetchAllLaundry])



    

    return (
      <>
        <LaundryBasket laundryArray={loadingLaundry}/>



      </>
    );
}

export default Laundry;