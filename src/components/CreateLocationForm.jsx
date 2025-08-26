import { useState } from "react"
import DeleteX from "./icons/DeleteX";
const API_URL = import.meta.env.VITE_API_URL;


const CreateLocationForm=({parentId,callbackFunction})=>{
    const [windowFormState,setWindowFormState]=useState(false);

    const [place,setPlace]=useState('');
    const [city,setCity]=useState('');





    const locationSubmit=async(e)=>{
        e.preventDefault();
        // console.log(planName);
        try{
            const response = await fetch(`${API_URL}/location`,{
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    place:place,
                    city:city,
                    ltype:e.target.ltype.value,
                    parentid:e.target.parentid.value,
                })
            });
            if(!response.ok)throw new Error('Submission failed');
            const result = await response.json();
            callbackFunction(result);
            setWindowFormState(!windowFormState);

            console.log(result);
        }catch(err){
            console.log(err);
        }
    }


    return (
      <>
        <div
          className="siteButton standardButton"
          onClick={() => {
            setWindowFormState(!windowFormState);
          }}
        >
          <span>Add new Location</span>
        </div>
        {windowFormState && (
          <div className="backdrop">
            <form className="windowForm" onSubmit={locationSubmit}>
              <div className="closebuttonContainer">
                <button className="deletionButton"
                  onClick={() => {
                    setWindowFormState(!windowFormState);
                  }}
                >
                  <DeleteX />
                </button>
              </div>
              <legend>Add a Location</legend>
              <input type="hidden" name="ltype" value="tripId"></input>
              <input type="hidden" name="parentid" value={+parentId}></input>

                <div><hr></hr></div>
                <div>
                    <div>
                        <label>Area:</label>
                    </div>
                    
                    <input type="text" value={place} onChange={(e)=>{setPlace(e.target.value)}}>
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
                  <button className="siteButton" type="submit" >Create Window</button>
              </div>
              
            </form>
          </div>
        )}
      </>
    );

}

export default CreateLocationForm;