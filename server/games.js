var config = require('./dbconfig');
const sql = require('mssql');
var emailOps = require('./email');



async function setMyTime(gameDate, selectedTime, userID, ampm, locationPref, myReservation, guestCount) {
    try{
        console.log('running setMyTime, location, reservation is: ', selectedTime, locationPref, myReservation);
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
        console.log('after proc runs, saveGame is: ', setTime)
       emailOps.sendPlayerListEmail(gameDate, ampm)
        return setTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMyTime(gameDate, userID, ampm) {
    try{
        console.log('running getMyTime ', gameDate, userID, ampm);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('userID', sql.Int, Number(userID))
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let getTime = await myproc.execute("getmytime")
        console.log('after proc runs, getTime is: ', getTime)
        return getTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEarliestTime(gameDate, ampm) {
    try{
        console.log('running getMyTime ', gameDate, ampm);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.output('playerCount', sql.Int)
        let getEarliestTime = await myproc.execute("getearliesttime")
        console.log('after proc runs, getEarliestTime is: ', getEarliestTime)
        return getEarliestTime;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerCount(gameDate, ampm) {
    try{
        console.log('running getMyTime ', gameDate, ampm);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.output('playerCount', sql.Int)
        let getPlayerCount = await myproc.execute("getPlayerCount")
        console.log('after proc runs, getEarliestTime is: ', getPlayerCount)
        return getPlayerCount;
    }
    catch (error) {
        console.log(error);
    }
}

async function resignGame(userID, gameDate, ampm) {
    try{
        console.log('running getMyTime ', gameDate, ampm);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let resignGame = await myproc.execute("resignGame")
        console.log('after proc runs, resignGame is: ', resignGame)
        emailOps.sendPlayerListEmail(gameDate, ampm)
        return resignGame;
    }
    catch (error) {
        console.log(error);
    }
}

async function getNotes(gameDate, ampm) {
    try{
        console.log('running getNote');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let getNote = await myproc.execute("getNotes")
        console.log('after proc runs, saveNote is: ', getNotes)
        return getNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteNote(noteID) {
    try{
        console.log('running getNote');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('noteID', sql.Int, noteID)
        let deleteNote = await myproc.execute("deleteNote")
        console.log('after proc runs, deleteNote is: ', deleteNote)
        return deleteNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNote(userID, gameDate, ampm, noteText) {
    try{
        console.log('running addNote');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.input('noteText', sql.NVarChar('max'), noteText)
        let addNote = await myproc.execute("addNote")
        console.log('after proc runs, addNote is: ', addNote)
        return addNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEmailNote(gameDate, ampm, noteText, msgSender) {
    try{
        console.log('running addEmailNote ampm is: ', ampm);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        console.log('coming in from api to addemailnote: ', gameDate, ampm, noteText, msgSender)
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        myproc.input('userEmail', sql.NVarChar('100'), msgSender)
        myproc.input('noteText', sql.NVarChar('max'), noteText)
        let addNote = await myproc.execute("addEmailNote")
        console.log('after proc runs, addNote is: ', addNote)
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