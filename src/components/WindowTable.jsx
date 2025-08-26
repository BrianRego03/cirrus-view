

const WindowTable=({windowObject})=>{
    console.log("hey");
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

    const dayProvider=(dayString)=>{
          const d = new Date(dayString + "T00:00:00"); 
          const ord = (n) => {
            const s = ["th", "st", "nd", "rd"],
              v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
          };
          const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
          const month = d.toLocaleDateString("en-GB", { month: "long" });
          return `${weekday} ${ord(d.getDate())} ${month}, ${d.getFullYear()}`;

    }


    return(
        <>
            <div className="windowTableContainer">
                {
                    windowObject.map((windowItem,windowIndex)=>{
                        console.log(windowItem);
                        console.log(windowIndex);
                        return(
                        
                        <div className="windowFrame" key={windowIndex} >
                            <div className={windowItem.rain?("frameDivSticky tableDanger"):("frameDivSticky tableClear")}>
                                
                                {windowItem.tripLocation?
                                (<b>{windowItem.tripLocation.length<30?
                                    windowItem.tripLocation:
                                    windowItem.tripLocation.slice(0,Math.min(windowItem.tripLocation.length,27))+"..."}</b>):
                                (<b>{dayProvider(windowItem.date)}</b>)}
                            </div>
                            <table className="windowTable reportTable">
                            <thead>

                                <tr>
                                    <th className="frameSticky windowColumn">Time</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return item.hour? (
                                            <th key={index} className="windowColumn">{timeFormatter(item.hour,item.minute)}</th>
                                        ):(
                                            <th key={index} className="windowColumn">
                                                {timeFormatter(+(item.datetime.split(":")[0]),+(item.datetime.split(":")[1]))}
                                            </th>

                                        )
                                    })}
                                </tr>

                            </thead>
                            <tbody>

                                <tr>
                                    <th className="frameSticky windowRow" >Rain</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index} 
                                            className={(item.rain || item.precip>=0.5)?
                                            "rainCell":((index%2)?"purpleCell":"whiteCell")}>
                                                {(item.rain || item.precip>=0.5)?"Rain":"Clear"}
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky windowRow" >Precip.</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  
                                            className={(item.rain || item.precip>=0.5)?
                                            "rainCell":((index%2)?"purpleCell":"whiteCell")}>
                                                {item.precip}
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky windowRow" >Temp</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  
                                            className={(item.rain || item.precip>=0.5)?
                                            "rainCell":((index%2)?"purpleCell":"whiteCell")}>
                                                {item.temp}°C
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky windowRow" >Status</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  
                                            className={(item.rain || item.precip>=0.5)?"rainCell":((index%2)?"purpleCell":"whiteCell")}>
                                                <img 
                                                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/2nd%20Set%20-%20Color/${item.icon}.png`}>

                                                </img>
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