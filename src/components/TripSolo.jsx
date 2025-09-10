import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import PopUpAlert from "./PopUpAlert";
import DeleteX from "./icons/DeleteX";
const API_URL = import.meta.env.VITE_API_URL;
import Essentials from "../utils/Essentials";
import CreateLocationForm from "./CreateLocationForm";
import CreateWindowForm from "./CreateWindowForm";
import EditIcon from "./icons/EditIcon";
import UpdateTrip from "./UpdateTrip";



const TripSolo = ()=>{
    // const {user}= useAuth();
    const [loadingLaundrySolo,setLaundrySolo]=useState(null);
    const navigate = useNavigate();
    const {id:lid}= useParams();



    const fetchLaundrySolo= useCallback(() => {
          (async () => {
            try {
              const res = await fetch(
                `${API_URL}/trip/${lid}`,
                {
                  credentials: "include",
                }
              );

              const data = await res.json();
              console.log(data);
              if(data?.error){
                
                navigate('/laundry');
              }
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

    const deleteLocationCall=async(windowID)=>{
        try {
              const res = await fetch(
                `${API_URL}/location/${windowID}`,
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

    const tripRefresh=(refreshData)=>{
      console.log(refreshData);
      setLaundrySolo(refreshData);
      
    }



    

    return (
      <>
        <div className="laundryBasket">
          {loadingLaundrySolo ? (
            <>
              <table className="windowTable">
                <tbody>
                  <tr>
                    <th>Trip Name</th>
                    <td>{loadingLaundrySolo.name}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>
                      <div className="dateContainer">
                        <div className="dateAligner">
                          {Essentials.formatDate(loadingLaundrySolo.date)}
                        </div>
                        

                        {/* <div className="windowCardEdit">
                          <PopUpAlert
                            alertmsg="Are you sure you want to delete this location?"
                            alertFunction={() => {
                              updateTripDate(item.id);
                            }}
                            classPost="editButton"
                            renderProp={(item) => <EditIcon className={item} />}
                            renderClass="iconTheme"
                          />{" "}
                        </div> */}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Time</th>
                    <td>
                      {loadingLaundrySolo.window
                        ? Essentials.timeFormatter(
                            loadingLaundrySolo.window.startWindowHour,
                            loadingLaundrySolo.window.startWindowMin,
                            loadingLaundrySolo.window.endWindowHour,
                            loadingLaundrySolo.window.endWindowMin
                          )
                        : "No window set"}
                    </td>
                  </tr>
                  <tr>
                    <th>Actions</th>
                    <td>
                      <div className="dateContainer">
                        <UpdateTrip tripItem={loadingLaundrySolo} stateUpdater={setLaundrySolo}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="laundryButtonContainer">
                {loadingLaundrySolo.location.length &&
                loadingLaundrySolo.window ? (
                  <div
                    className="siteButton standardButton"
                    onClick={() => {
                      navigate(`/trip/${lid}/report`);
                    }}
                  >
                    <span>Trip Report</span>
                  </div>
                ) : (
                  <></>
                )}
                {loadingLaundrySolo.window ? (
                  <></>
                ) : (
                  <CreateWindowForm
                    parentId={lid}
                    type="tripId"
                    callbackFunction={tripRefresh}
                  />
                )}
                <CreateLocationForm
                  parentId={lid}
                  callbackFunction={tripRefresh}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="laundryBasketModal">
          {loadingLaundrySolo?.location ? (
            loadingLaundrySolo.location.map((item) => {
              return (
                <div key={item.id} className="laundryContainer">
                  <div className="windowCardDelete">
                    <PopUpAlert
                      alertmsg="Are you sure you want to delete this location?"
                      alertFunction={() => {
                        deleteLocationCall(item.id);
                      }}
                      classPost="deletionButton"
                      renderProp={(item) => <DeleteX className={item} />}
                      renderClass="iconTheme"
                    />
                  </div>
                  <div className="laundryCard">
                    <div className="divEllipsis">{item.name}</div>
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

export default TripSolo;