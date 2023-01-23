var config = require('./dbconfig');
const sql = require('mssql');

async function getHourStatus(gameDate, gameCourt) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate) 
        myproc.input('gameCourt', sql.Int, gameCourt)
        let user = await myproc.execute("getHourStatus")
        return user.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
    async function getCourts() {
        try{
            let pool = await sql.connect(config);
            var myproc = new sql.Request(pool);
            let courts = await myproc.execute("getCourts")
            return courts.recordset;
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getHourList() {
        try{
            let pool = await sql.connect(config);
            var myproc = new sql.Request(pool);
            let hours = await myproc.execute("getHours")
            return hours.recordset;
        }
        catch (error) {
            console.log(error);
        }
    }


module.exports = {
    getHourStatus : getHourStatus,
    getCourts : getCourts,
    getHourList : getHourList,
}