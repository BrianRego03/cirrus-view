import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import LaundryBasket from "./LaundryBasket";
const API_URL=  import.meta.env.VITE_API_URL;



const Laundry = ()=>{
    const {user}= useAuth();
    const navigate = useNavigate();
    const [loadingLaundry,setLaundry]=useState(null);

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
      if(!user){
        ()=>{navigate("/")};
      }
        fetchAllLaundry();
    },[fetchAllLaundry]);

    const deleteLaundryCall=async(laundryID)=>{
        try {
              const res = await fetch(
                `${API_URL}/laundry/${laundryID}`,
                {
                method:'DELETE',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                }
              );

              const data = await res.json();
              console.log(data);
              setLaundry(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
    }



    

    return (
      <>
        <LaundryBasket laundryArray={loadingLaundry} dropFunction={deleteLaundryCall}/>



      </>
    );
}

export default Laundry;