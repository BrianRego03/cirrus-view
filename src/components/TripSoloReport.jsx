import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import WindowTable from "./WindowTable";
import Essentials from "../utils/Essentials";



const TripSoloReport = ()=>{
    // const {user}= useAuth();
    const [loadingLaundryReport,setLaundryReport]=useState(null);
    const navigate = useNavigate();
    const {id:lid}= useParams();


    const fetchLaundrySoloReport= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/tripReport/${lid}`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
              console.log(data);
              if(data?.error){
                
                navigate('/laundry');
              }
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
              <table className="windowTable">
                <tbody>
                  <tr>
                    <th>Trip Name</th>
                    <td>{loadingLaundryReport.name}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>
                      {Essentials.formatDate(
                        new Date(loadingLaundryReport.date)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Time</th>
                    <td>
                      {loadingLaundryReport.window
                        ? Essentials.timeFormatter(
                            loadingLaundryReport.window.startWindowHour,
                            loadingLaundryReport.window.startWindowMin,
                            loadingLaundryReport.window.endWindowHour,
                            loadingLaundryReport.window.endWindowMin
                          )
                        : "No window set"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
        </div>

        {loadingLaundryReport?.location?.map((item,index) => {
            item.weatherData[0].windowHours=item.weatherData[0].hours;
            item.weatherData[0].date=item.weatherData[0].datetime;
            item.weatherData[0].tripLocation=item.name;
            console.log(item);
          return item?.weatherData?(
            <div key={index}>
              <WindowTable windowObject={item.weatherData} />
            </div>
          ) : (
            <div></div>
          );
        })}

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

export default TripSoloReport;