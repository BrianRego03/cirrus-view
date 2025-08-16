

const WindowTable=({windowObject})=>{

    const timeParsinator=(num)=>{
        if(parseInt(num)===0){
            return "00";
        }else if((parseInt(num)>0) && (parseInt(num)<10)){
            return ("0" + num.toString());
        }else return (num.toString());
    }

    const timeFormatter=(sth,stm)=>{
        let stringOfTime =
          timeParsinator(sth) +
          ":" +
          timeParsinator(stm);
        return stringOfTime;
    }


    return(
        <>
            <div className="windowTableContainer">
                {
                    windowObject.map((windowItem,windowIndex)=>{
                        return(<div className="windowFrame" key={windowIndex} >
                            <table className="windowTable">
                            <thead>

                                <tr>
                                    <th className="frameSticky">{windowItem.startWindowDay}</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <th key={index}>{timeFormatter(item.hour,item.minute)}</th>
                                        )
                                    })}
                                </tr>

                            </thead>
                            <tbody>

                                <tr>
                                    <th className="frameSticky" rowSpan={2}>Weather</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index} className={item.rain?"rainCell":""}>
                                                {(item.rain)?"rain":"clear"}
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  className={item.rain?"rainCell":""}>
                                                {item.temp}°C
                                            </td>
                                        )
                                    })}

                                </tr>
                            </tbody>
                        </table></div>)
                    })

                }

            </div>
        
        </>
    )

}

export default WindowTable;