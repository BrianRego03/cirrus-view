import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import CreateWindowForm from "./CreateWindowForm";
import PopUpAlert from "./PopUpAlert";
const API_URL = import.meta.env.VITE_API_URL;



const LaundrySolo = ()=>{
    // const {user}= useAuth();
    const [loadingLaundrySolo,setLaundrySolo]=useState(null);
    const navigate = useNavigate();
    const {id:lid}= useParams();

    const timeParsinator=(num)=>{
        if(parseInt(num)===0){
            return "00";
        }else if((parseInt(num)>0) && (parseInt(num)<10)){
            return ("0" + num.toString());
        }else return (num.toString());
    }

    const timeFormatter=(sth,stm,edh,edm)=>{
        let stringOfTime =
          timeParsinator(sth) +
          ":" +
          timeParsinator(stm) +
          " ---> " +
          timeParsinator(edh) +
          ":" +
          timeParsinator(edm);
        return stringOfTime;
    }

    const fetchLaundrySolo= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `${API_URL}/laundry/${lid}`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
              console.log(data);
              setLaundrySolo(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
          })();
        },[lid]);

    useEffect(()=>{
        fetchLaundrySolo();
    },[fetchLaundrySolo]);

    const deleteWindowCall=async(windowID)=>{
        try {
              const res = await fetch(
                `${API_URL}/windows/${windowID}`,
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
              setLaundrySolo(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
    }



    

    return (
      <>
        <div className="laundryBasket">
          {loadingLaundrySolo ? (
            <>
              <div>Laundry Name : {loadingLaundrySolo.name}</div>
              <div>Location : {loadingLaundrySolo.location}</div>
              <div className="laundryCard" onClick={()=>{navigate(`/laundry/${lid}/report`)}}>
                Weather Report</div>
              <CreateWindowForm parentId={lid}/>
            </>
          ) : (
            <></>
          )}
        </div>



        

        <div
          className="laundryBasketModal"

        >
          {loadingLaundrySolo?.windows ? (
            loadingLaundrySolo.windows.map((item, index) => {
              return (
                <div key={item.id} className="windowHolder">
                  <div className="windowCard">
                    <div>{index + 1 + ") " + item.startWindowDay + " "}</div>
                    <div>
                      {timeFormatter(
                        item.startWindowHour,
                        item.startWindowMin,
                        item.endWindowHour,
                        item.endWindowMin
                      )}
                    </div>

                    <div>{item.location}</div>
                  </div>
                  <div className="windowCardDelete">
                    <PopUpAlert
                      buttonmsg="X"
                      alertmsg="Are you sure you want to delete this window?"
                      alertFunction={()=>{deleteWindowCall(item.id)}}
                     
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>

        
      </>
    );
}

export default LaundrySolo;