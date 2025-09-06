// const months = ["JAN" , "FEB" , "MAR" , "APR" , "MAY" , "JUN" , "JLY" , "AUS" , "" , "OCT" , "NOV" , "DEC"]

function DateFormater(date){
    const gotDate = new Date(date)
    let getMonth = gotDate.getMonth()+1
    let gotDay = gotDate.getDate()
    const month = getMonth<10?`0${getMonth}`:getMonth
    const day = gotDay <10 ? `0${gotDay}`:gotDay
    
    return `${day}-${month}-${gotDate.getFullYear()}`

}

export default DateFormater