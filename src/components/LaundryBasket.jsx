import { useNavigate } from "react-router-dom"
import PopUpAlert from "./PopUpAlert";




const LaundryBasket=({laundryArray,dropFunction})=>{
    const navigate=useNavigate();

    return(
        <div className="laundryBasketModal" >
            {(Array.isArray(laundryArray))?
                laundryArray.map((item,index)=>{
                    return(
                <div key={item.id} className="laundryContainer">
                    <div className="laundryCard" onClick={()=>{navigate(`/laundry/${item.id}`)}}>
                        <div >{(index + 1) + ") " + item.name}</div>
                        <div >{item.location}</div>
                    </div>
                    <div className="windowCardDelete">
                        <PopUpAlert
                            buttonmsg="X"
                            alertmsg="Are you sure you want to delete this Laundry Plan?"
                            alertFunction={()=>{dropFunction(item.id)}}
                            
                        />
                    </div>
                </div>
                  )
                })

                :<></>}
 
        </div>
    )
}

export default LaundryBasket;