import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL;


const CreateWindowForm=({parentId})=>{
    const [windowFormState,setWindowFormState]=useState(false);

    const [startTime,setStartTime]=useState("");
    const [endTime,setEndTime]=useState("");
    const [windowDay,setWindowDay]=useState("");
    const [swDay,setSwDay]=useState("");
    const [swHour,setSwHour]=useState("");
    const [swMin,setSwMin]=useState("");
    const [edDay,setEdDay]=useState("");
    const [edHour,setEdHour]=useState("");
    const [edMin,setEdMin]=useState("");
    const [startError,setStartError]=useState("");
    const [endError,setEndError]=useState("");

    const dayArray = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

    const handleStartTime = (timeString)=>{
        if(edHour!="" && (edHour<=(+(timeString.split(":")[0])))){
          setStartTime("");
          setStartError("Start time must be earlier than end time");
        }else{
            setStartTime(timeString);
            setSwHour(+(timeString.split(":")[0]));
            setSwMin(+(timeString.split(":")[1]));
            setStartError("");
        }

    }

    const handleEndTime = (timeString)=>{
        if(swHour!="" && ((+(timeString.split(":")[0]))<=swHour)){
            setEndTime("");
            setEndError("End time must be later than start time");
        }else{
            setEndTime(timeString);
            setEdHour(+(timeString.split(":")[0]));
            setEdMin(+(timeString.split(":")[1]));
            setEndError("");
        }

    }

    const handleWindowDay =(dayString)=>{
        setWindowDay(dayString);
        setSwDay(dayString);
        setEdDay(dayString);
    }

    const windowSubmit=async(e)=>{
        e.preventDefault();
        // console.log(planName);
        try{
            const response = await fetch(`${API_URL}/windows`,{
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    swDay:swDay,
                    swHour:swHour,
                    swMin:swMin,
                    edDay:edDay,
                    edHour:edHour,
                    edMin:edMin,
                    wtype:e.target.wtype.value,
                    parentid:e.target.parentid.value,
                })
            });
            if(!response.ok)throw new Error('Submission failed');
            const result = await response.json();
            console.log(result);
        }catch(err){
            console.log(err);
        }
    }


    return (
      <>
        <div
          className="laundryCard"
          onClick={() => {
            setWindowFormState(!windowFormState);
          }}
        >
          Add new Laundry window
        </div>
        {windowFormState && (
          <div className="backdrop">
            <form className="windowForm" onSubmit={windowSubmit}>
              <div className="closebuttonContainer">
                <button
                  onClick={() => {
                    setWindowFormState(!windowFormState);
                  }}
                >
                  X
                </button>
              </div>
              <legend>Create a Laundry Window</legend>
              <input type="hidden" name="swDay"></input>
              <input type="hidden" name="swHour"></input>
              <input type="hidden" name="swMin"></input>
              <input type="hidden" name="edDay"></input>
              <input type="hidden" name="edHour"></input>
              <input type="hidden" name="edMin"></input>
              <input type="hidden" name="wtype" value="laundryId"></input>
              <input type="hidden" name="parentid" value={+parentId}></input>
              <div>
                <div>
                  <label>Day:</label>
                </div>

                <select
                  onChange={(e) => {
                    handleWindowDay(e.target.value);
                  }}
                >
                  <option value="" defaultValue={""}></option>
                  {dayArray.map((item,index) => {
                    return <option value={item} key={index}>{item}</option>;
                  })}
                </select>
              </div>
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    handleStartTime(e.target.value);
                  }}
                ></input>
                <div>{startError}</div>
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    handleEndTime(e.target.value);
                  }}
                ></input>
                <div>{endError}</div>
              </div>
              <button type="submit" >Create Window</button>
            </form>
          </div>
        )}
      </>
    );

}

export default CreateWindowForm;