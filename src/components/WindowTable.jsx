

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
                        return(
                        
                        <div className="windowFrame" key={windowIndex} >
                            <div className="frameDivSticky">{dayProvider(windowItem.date)}</div>
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
                                    <th className="frameSticky" >Rain</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index} className={item.rain?"rainCell":""}>
                                                {(item.rain)?"Rain":"Clear"}
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky" >Precip.</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  className={item.rain?"rainCell":""}>
                                                {item.precip}
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky" >Temp</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  className={item.rain?"rainCell":""}>
                                                {item.temp}°C
                                            </td>
                                        )
                                    })}

                                </tr>
                                <tr>
                                    <th className="frameSticky" >Status</th>
                                    {windowItem.windowHours.map((item,index)=>{
                                        return (
                                            <td key={index}  className={item.rain?"rainCell":""}>
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