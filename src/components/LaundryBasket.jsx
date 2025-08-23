import { useNavigate } from "react-router-dom"
import PopUpAlert from "./PopUpAlert";
import DeleteX from "./icons/DeleteX";




const LaundryBasket=({laundryArray,dropFunction})=>{
    const navigate=useNavigate();

    return(
        <div className="laundryBasketModal" >
            {(Array.isArray(laundryArray))?
                laundryArray.map((item,index)=>{
                    return(
                <div key={item.id} className="laundryContainer">
                    <div className="windowCardDelete">
                        <PopUpAlert
                            
                            alertmsg="Are you sure you want to delete this Laundry Plan?"
                            alertFunction={()=>{dropFunction(item.id)}}
                            classPost="deletionButton"
                            renderProp={(item)=><DeleteX className={item}/>}
                            renderClass="iconTheme"
                            
                        />
                    </div>
                    <div className="laundryCard" onClick={()=>{navigate(`/laundry/${item.id}`)}}>
                        <div >{(index + 1) + ") " + item.name}</div>
                        <div className="laundryCardLimiter">{item.location}</div>
                    </div>

                </div>
                  )
                })

                :<></>}
 
        </div>
    )
}

export default LaundryBasket;