import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;


const CreateLaundry=()=>{
    const [laundryFormState,setLaundryFormState]=useState(false);

    const {user,loading}= useAuth();
    const navigate=useNavigate();

    useEffect(() => {
    if (!loading && !user?.user) {
        navigate("/login");
    }
    }, [loading, user, navigate]);

    const [planName,setPlanName]=useState('');
    const [area,setArea]=useState('');
    const [city,setCity]=useState('');

    const laundrySubmit=async(e)=>{
        e.preventDefault();
        console.log(planName);
        try{
            const response = await fetch(`${API_URL}/laundry`,{
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    name:planName,
                    place:area,
                    city:city
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
            setLaundryFormState(!laundryFormState);
          }}
        >
          Add new Laundry Plan
        </div>
        {laundryFormState && (
          <div className="backdrop">       
            <form className="windowForm" onSubmit={laundrySubmit}>
                <div className="closebuttonContainer">
                <button
                    onClick={() => {
                    setLaundryFormState(!laundryFormState);
                    }}
                >
                    x
                </button>
                </div>
                <legend>Create new Laundry plan</legend>
                <div><hr></hr></div>
                <div>
                    <div>
                        <label>Plan name:</label>
                    </div>
                    
                    <input type="text" value={planName} onChange={(e)=>{setPlanName(e.target.value)}}>
                    </input>
                </div>
                <div><hr></hr></div>
                <div>
                    <div>
                        <label>Area:</label>
                    </div>
                    
                    <input type="text" value={area} onChange={(e)=>{setArea(e.target.value)}}>
                    </input>
                </div>
                <div><hr></hr></div>
                <div>
                    <div>
                        <label>City:</label>
                    </div>
                    
                    <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}}>
                    </input>
                </div>
                <div><hr></hr></div>
                <div className="buttonAligner">
                    <button className="siteButton" type="submit">Create Plan</button>
                </div>
                

            </form>
            </div>)}
        
        
       
    </>)
}

export default CreateLaundry;