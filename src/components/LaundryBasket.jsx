import { useNavigate } from "react-router-dom"



const LaundryBasket=({laundryArray})=>{
    const navigate=useNavigate();

    return(
        <div className="laundryBasket" >
            {(Array.isArray(laundryArray))?
                laundryArray.map((item,index)=>{
                    return(
                    <div key={item.id} className="laundryCard" onClick={()=>{navigate(`/laundry/${item.id}`)}}>
                        <div >{(index + 1) + ") " + item.name}</div>
                        <div >{item.location}</div>
                    </div>)
                })

                :<></>}
 
        </div>
    )
}

export default LaundryBasket;