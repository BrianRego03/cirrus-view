import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
import DeleteX from "./icons/DeleteX";
const API_URL = import.meta.env.VITE_API_URL;


const CreateTrip=()=>{
    const [tripFormState,setTripFormState]=useState(false);

    const {user,loading}= useAuth();
    const navigate=useNavigate();

    useEffect(() => {
    if (!loading && !user?.user) {
        navigate("/login");
    }
    }, [loading, user, navigate]);

    const [name,setName]=useState('');


    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 6);

    const format = (d) => d.toISOString().split("T")[0];

    const [date, setDate] = useState(format(today));

    const tripSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}/trip`,{
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    name:name,
                    date:date
                })
            });
            if(!response.ok)throw new Error('Submission failed');
            const result = await response.json();
            console.log(result);
        }catch(err){
            console.log(err);
        }

    }
    
    


    return (<>
        
  <div
          className="siteButton"
          onClick={() => {
            setTripFormState(!tripFormState);
          }}
        >
          Add new Day Trip
        </div>
        {tripFormState && (
          <div className="backdrop">       
            <form className="windowForm" onSubmit={tripSubmit}>
                <div className="closebuttonContainer">
                <button className="deletionButton"
                    onClick={() => {
                    setTripFormState(!tripFormState);
                    }}
                >
                    <DeleteX />
                </button>
                </div>
                <legend>Create new Day Trip</legend>
                <div><hr></hr></div>
                <div>
                    <div>
                        <label>Trip name:</label>
                    </div>
                    
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}>
                    </input>
                </div>
                <div><hr></hr></div>
                <div>
                    <div>
                        <label>Date:</label>
                    </div>
                    
                    <input
                    type="date"
                    value={date}
                    min={format(today)}
                    max={format(weekFromNow)}
                    onChange={(e) => setDate(e.target.value)}
                    ></input>
                </div>
               
                <div><hr></hr></div>
                <div className="buttonAligner">
                    <button className="siteButton" type="submit">Create Day Trip</button>
                </div>
                

            </form>
            </div>)}
        
        
       
    </>)
}

export default CreateTrip;