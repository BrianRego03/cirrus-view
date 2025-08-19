import { useState } from "react"


const CreateWindowForm=()=>{
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

    const handleStartTime = (timeString)=>{
        if(edHour!="" && (edHour<=(+(timeString.split(":")[0])))){
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
            setEndError("End time must be later than start time");
        }else{
            setEndTime(timeString);
            setEdHour(+(timeString.split(":")[0]));
            setEdMin(+(timeString.split(":")[1]));
            setEndError("");
        }

    }


    return <>
    <div className="laundryCard" onClick={()=>{setWindowFormState(!windowFormState)}}>
        Add new Laundry window
    </div>
    {windowFormState&&    
        (<div className="windowForm" >
            <form>
                <legend>Create a Laundry Window</legend>
                <input type="hidden" name="swDay"></input>
                <input type="hidden" name="swHour"></input>
                <input type="hidden" name="swMin"></input>
                <input type="hidden" name="edDay"></input>
                <input type="hidden" name="edHour"></input>
                <input type="hidden" name="edMin"></input>
                <input type="hidden" name="wtype"></input>
                <div>
                    <div><label>Day:</label></div>
                    <input type="text" value={windowDay} onChange={(e)=>{setWindowDay(e.target.value)}}>
                    </input>
                    
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e)=>{handleStartTime(e.target.value)}}>
                    </input>
                    <div>{startError}</div>
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e)=>{handleEndTime(e.target.value)}}>
                    </input>
                    <div>{endError}</div>
                </div>
                <button type="submit">Create Window</button>
            </form>
        </div>)
    }
    
    </>

}

export default CreateWindowForm;