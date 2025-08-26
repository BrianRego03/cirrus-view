

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

export default { timeParsinator, timeFormatter };