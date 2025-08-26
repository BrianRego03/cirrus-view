import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import CreateTrip from "./CreateTrip";
import TripBasket from "./TripBasket";
const API_URL=  import.meta.env.VITE_API_URL;



const Trip = ()=>{
    const {user}= useAuth();
    const navigate = useNavigate();
    const [loadingTrip,setTrip]=useState(null);

    const fetchAllLaundry= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/trip`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
            //   console.log(data);
              setTrip(data);

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

    const deleteTripCall=async(tripID)=>{
        try {
              const res = await fetch(
                `${API_URL}/trip/${tripID}`,
                {
                method:'DELETE',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                }
              );

              const data = await res.json();
            //   console.log(data);
              setTrip(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
    }



    

    return (
      <>
        <CreateTrip />
        <TripBasket laundryArray={loadingTrip} dropFunction={deleteTripCall}/>



      </>
    );
}

export default Trip;