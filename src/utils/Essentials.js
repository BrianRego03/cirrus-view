

const timeParsinator=(num)=>{
    if(parseInt(num)===0){
        return "00";
    }else if((parseInt(num)>0) && (parseInt(num)<10)){
        return ("0" + num.toString());
    }else return (num.toString());
}

const timeFormatter=(sth,stm,edh,edm)=>{
    let stringOfTime =
        timeParsinator(sth) +
        ":" +
        timeParsinator(stm) +
        " ---> " +
        timeParsinator(edh) +
        ":" +
        timeParsinator(edm);
    return stringOfTime;
}

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = date.getUTCFullYear();

  // add ordinal suffix
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  return `${day}${suffix} ${month}, ${year}`;
}

export default { timeParsinator, timeFormatter, formatDate };