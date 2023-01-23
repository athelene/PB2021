var config = require('./dbconfig');
const sql = require('mssql');
var emailOps = require('./email');



async function setMyTime(gameDate, selectedTime, userID, ampm, locationPref, myReservation, guestCount) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('selectedTime', sql.NVarChar(8), selectedTime)
        myproc.input('userID', sql.Int, userID)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.input('locationPref', sql.NVarChar(10), locationPref)
        myproc.input('myReservation', sql.Int, myReservation)
        myproc.input('guestCount', sql.Int, guestCount)
        let setTime = await myproc.execute("setmytime")
       emailOps.sendPlayerListEmail(gameDate, ampm)
        return setTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMyTime(gameDate, userID, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('userID', sql.Int, Number(userID))
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let getTime = await myproc.execute("getmytime")
        return getTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEarliestTime(gameDate, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.output('playerCount', sql.Int)
        let getEarliestTime = await myproc.execute("getearliesttime")
        return getEarliestTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerCount(gameDate, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.output('playerCount', sql.Int)
        let getPlayerCount = await myproc.execute("getPlayerCount")
        return getPlayerCount;
    }
    catch (error) {
        console.log(error);
    }
}

async function resignGame(userID, gameDate, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let resignGame = await myproc.execute("resignGame")
        emailOps.sendPlayerListEmail(gameDate, ampm)
        return resignGame;
    }
    catch (error) {
        console.log(error);
    }
}

async function getNotes(gameDate, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let getNote = await myproc.execute("getNotes")
        return getNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteNote(noteID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('noteID', sql.Int, noteID)
        let deleteNote = await myproc.execute("deleteNote")
        return deleteNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNote(userID, gameDate, ampm, noteText) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.input('noteText', sql.NVarChar('max'), noteText)
        let addNote = await myproc.execute("addNote")
        return addNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEmailNote(gameDate, ampm, noteText, msgSender, userID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.input('userEmail', sql.NVarChar('100'), msgSender)
        myproc.input('noteText', sql.NVarChar('max'), noteText)
        let addNote = await myproc.execute("addEmailNote")
        return addNote;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    setMyTime : setMyTime,
    getMyTime : getMyTime,
    getEarliestTime : getEarliestTime,
    getPlayerCount : getPlayerCount,
    resignGame : resignGame,
    addNote : addNote,
    addNote: addNote,
    getNotes: getNotes,
    deleteNote: deleteNote,
    addEmailNote: addEmailNote
}