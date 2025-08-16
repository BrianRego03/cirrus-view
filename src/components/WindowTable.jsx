

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
            <div>
                {
                    windowObject.map((windowItem,windowIndex)=>{
                        return(<table>
                            <tr>
                                <th>{windowItem.startWindowDay}</th>
                                {windowItem.windowHours.map((item,index)=>{
                                    return (
                                        <th>{timeFormatter(item.hour,item.minute)}</th>
                                    )
                                })}
                            </tr>
                        </table>)
                    })

                }

            </div>
        
        </>
    )

}

export default WindowTable;