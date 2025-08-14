import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";



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

        <div className="laundryBasket" >
            {(Array.isArray(loadingLaundry))?
                loadingLaundry.map((item,index)=>{
                    return(
                    <div key={item.id} className="laundryCard" onClick={()=>{navigate(`/laundry/${item.id}`)}}>
                        <div >{(index + 1) + ") " + item.name}</div>
                        <div >{item.location}</div>
                    </div>)
                })

                :<></>}
 
        </div>

      </>
    );
}

export default Laundry;