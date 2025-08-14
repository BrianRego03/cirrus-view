import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";



const LaundrySoloReport = ()=>{
    // const {user}= useAuth();
    const [loadingLaundryReport,setLaundryReport]=useState(null);
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

    const fetchLaundrySoloReport= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/laundryReport/${lid}`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
              console.log(data);
              setLaundryReport(data);

            } catch (err) {
              console.error(err);
              alert("Network error");
            }
          })();
        },[lid]);

    useEffect(()=>{
        fetchLaundrySoloReport();
    },[fetchLaundrySoloReport])



    

    return (
      <>
        <div className="laundryBasket">
          {loadingLaundryReport ? (
            <>
              <div>Laundry Name : {loadingLaundryReport.laundry.name}</div>
              <div>Location : {loadingLaundryReport.location}</div>
              <div>Forecast for this week : </div>
              <div>{loadingLaundryReport.description}</div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* <div
          className="laundryBasket"
          onClick={() => {
            navigate("/");
          }}
        >
          {loadingLaundrySolo?.windows ? (
            loadingLaundrySolo.windows.map((item, index) => {
              return (
                <div key={item.id} className="laundryCard">
                  <div>
                    {index +
                      1 +
                      ") " +
                      item.startWindowDay +
                      " " +
                      timeFormatter(
                        item.startWindowHour,
                        item.startWindowMin,
                        item.endWindowHour,
                        item.endWindowMin
                      )}
                  </div>

                  <div>{item.location}</div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div> */}
      </>
    );
}

export default LaundrySoloReport;