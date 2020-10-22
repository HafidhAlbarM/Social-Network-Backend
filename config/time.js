exports.currentDateTime = () => {
    const currentdate = new Date(); 
    const datetime = currentdate.getFullYear() + "-"  
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}