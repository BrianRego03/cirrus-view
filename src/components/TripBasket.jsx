import { useNavigate } from "react-router-dom"
import PopUpAlert from "./PopUpAlert";
import DeleteX from "./icons/DeleteX";
import Essentials from "../utils/Essentials";




const TripBasket=({laundryArray,dropFunction})=>{
    const navigate=useNavigate();

    return(
        <div className="laundryBasketModal" >
            {(Array.isArray(laundryArray))?
                laundryArray.map((item)=>{
                    return(
                <div key={item.id} className="laundryContainer">
                    <div className="windowCardDelete">
                        <PopUpAlert
                            
                            alertmsg="Are you sure you want to delete this Day Trip?"
                            alertFunction={()=>{dropFunction(item.id)}}
                            classPost="deletionButton"
                            renderProp={(item)=><DeleteX className={item}/>}
                            renderClass="iconTheme"
                            
                        />
                    </div>
                    <div className="laundryCard" onClick={()=>{navigate(`/trip/${item.id}`)}}>
                        <div >{ item.name}</div>
                        <div>{ Essentials.formatDate(item.date) }</div>
                        {/* <div>
                        {item.window?(Essentials.timeFormatter(
                            item.window.startWindowHour,
                            item.window.startWindowMin,
                            item.window.endWindowHour,
                            item.window.endWindowMin
                        )):("")}
                        </div> */}
                    </div>

                </div>
                  )
                })

                :<></>}
 
        </div>
    )
}

export default TripBasket;