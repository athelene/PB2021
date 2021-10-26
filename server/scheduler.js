const dotenv = require("dotenv");
dotenv.config();

var config = require('./dbconfig');
const sql = require('mssql');

async function startScheduler() {

    var dateInput = new Date();
    var dow = dateInput.getDay()+1
    
    try{
        console.log('running scheduler for this day of the week');
        console.log('dow is : ', dow)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        myproc.input('dow', sql.Int, dow)
        let schedule = await myproc.execute("startScheduler")
        console.log('after proc runs, saveGame is: ', schedule)


 //       return scheduler;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    startScheduler: startScheduler

}