import { useState } from "react"

const PopUpAlert=({buttonmsg,alertmsg,alertFunction,classPost,renderProp,renderClass})=>{
    const [popState,setPopState]=useState(false);

    return(
        <>
            {buttonmsg?(
                <button className={classPost} onClick={()=>{setPopState(true)}}>{buttonmsg}</button>
            ):(
                <button className={classPost} onClick={()=>{setPopState(true)}}>{renderProp(renderClass)}</button>
            )}
            
            {popState&&(<div className="backdrop">
                <div className="popupForm">
                    <div>{alertmsg}</div>
                    <div className="popupButtonContainer">
                        <div className="popupButton" onClick={()=>{
                            alertFunction();
                            setPopState(false);                         
                            
                            }}>Yes</div>
                        <div className="popupButton" onClick={()=>{setPopState(false);}}>No</div>
                    </div>
                </div>
            </div>)}

        </>
    )
}

export default PopUpAlert;