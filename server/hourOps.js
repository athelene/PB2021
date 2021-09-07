var config = require('./dbconfig');
const sql = require('mssql');

async function getHourStatus(gameDate, gameCourt) {
    try{
        console.log('running getHourStatus ,about to connect to sql');
        console.log('gameDate, court is: ', gameDate, gameCourt);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate) 
        myproc.input('gameCourt', sql.Int, gameCourt)
        let user = await myproc.execute("getHourStatus")
        console.log('after proc runs, user is: ', user.recordset)
        return user.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
    async function getCourts() {
        try{
            console.log('running getCourts ,about to connect to sql');
            let pool = await sql.connect(config);
            var myproc = new sql.Request(pool);
            let courts = await myproc.execute("getCourts")
            console.log('after proc runs, courts is: ', courts.recordset)
            return courts.recordset;
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getHourList() {
        try{
            console.log('running getHourList ,about to connect to sql');
            let pool = await sql.connect(config);
            var myproc = new sql.Request(pool);
            let hours = await myproc.execute("getHours")
            console.log('after proc runs, user is: ', hours.recordset)
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