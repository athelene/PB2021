var config = require('./dbconfig');
const sql = require('mssql');



async function setMyTime(gameDate, selectedTime, userID, ampm) {
    try{
        console.log('running setMyTime, selectedTime is: ', selectedTime);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('selectedTime', sql.NVarChar(8), selectedTime)
        myproc.input('userID', sql.Int, userID)
        myproc.input('ampm', sql.NVarChar(1), ampm)
        let setTime = await myproc.execute("setmytime")
        console.log('after proc runs, saveGame is: ', setTime)
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
        return resignGame;
    }
    catch (error) {
        console.log(error);
    }
}

async function saveGame(gameStart, gameEnd, gameGroup, selectedCourt) {
    try{
        console.log('running saveGame,about to connect to sql');
        console.log('gameCourt is : ', gameStart, gameEnd, gameGroup, selectedCourt)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameStart', sql.DateTime, gameStart)
        myproc.input('gameEnd', sql.DateTime, gameEnd)
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        myproc.input('gameGroup', sql.Int, gameGroup)
        let saveGame = await myproc.execute("saveGame")
        console.log('after proc runs, saveGame is: ', saveGame)
        return saveGame;
    }
    catch (error) {
        console.log(error);
    }
}

async function editGame(gameID, gameStart, gameEnd, gameGroup, selectedCourt, userID) {
    try{
        console.log('running saveGame,about to connect to sql');
        console.log('gameCourt is : ', gameID, gameStart, gameEnd, gameGroup, selectedCourt, userID)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID)
        myproc.input('gameStart', sql.DateTime, gameStart)
        myproc.input('gameEnd', sql.DateTime, gameEnd)
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        myproc.input('gameGroup', sql.Int, gameGroup)
        myproc.input('userID', sql.Int, userID)
        let editGame = await myproc.execute("editGame")
        console.log('after proc runs, editGame is: ', editGame)
        return editGame;
    }
    catch (error) {
        console.log(error);
    }
}
  
async function getGameList(gameDate, selectedCourt) {
    try{
        console.log('running getGameList,about to connect to sql');
        console.log('input to function is : ', gameDate, selectedCourt)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.NVarChar(10), gameDate) 
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        let gameList = await myproc.execute("getGameList")
        console.log('after proc runs, gameList is: ', gameList.recordset)
        return gameList.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFullGameList() {
    try{
        console.log('running getFullGameList,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let gameList = await myproc.execute("getFullGameList")
        console.log('after proc runs, gameList is: ', gameList.recordset)
        return gameList.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getGamePlayers(gameID) {
    try{
        console.log('running getGamePlayers, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID)
        let gamePlayers = await myproc.execute("getGamePlayers")
        console.log('after proc runs, gamePlayers is: ', gamePlayers.recordset)
        return gamePlayers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerStatus(gameID, userID) {
    try{
        console.log('running getPlayerStatus, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        myproc.input('userID', sql.Int, userID)
        let playerStatus = await myproc.execute("getPlayerStatus")
        console.log('after proc runs, playerStatus is: ', playerStatus)
        return playerStatus;
    }
    catch (error) {
        console.log(error);
    }
}

async function changePlayerStatus(gameID, userID, playerStatus) {
    try{
        console.log('running changePlayerStatus, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        myproc.input('userID', sql.Int, userID);
        if(playerStatus === 'true'){
            let playerStatus = await myproc.execute("addPlayerToGame")
            return playerStatus;
        } else {
        let playerStatus = await myproc.execute("removePlayerFromGame")
        return playerStatus;}
    }
    catch (error) {
        console.log(error);
    }
}

async function getGameNotes(gameID) {
    try{
        console.log('running getGameNotes, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        let gameNotes = await myproc.execute("getGameNotes")
        console.log('after proc runs, gameNotes is: ', gameNotes)
        return gameNotes.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteGame(gameID) {
    try{
        console.log('running getGameNotes, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        let gameNotes = await myproc.execute("deleteGame")
        console.log('after proc runs, gameNotes is: ', gameID)
        return gameNotes.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getGameInfo(gameID) {
    try{
        console.log('running getGameInfo, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        let gameInfo = await myproc.execute("getGameInfo")
        console.log('after proc runs, gameInfo is: ', gameInfo)
        return gameInfo.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNote(gameID, userID, gameNote) {
    try{
        console.log('running getGameNotes, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        myproc.input('userID', sql.Int, userID);
        myproc.input('gameNote', sql.Text, gameNote);
        let addNote = await myproc.execute("addNote")
        console.log('after proc runs, gameNotes is: ', addNote)
        return addNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteGameNote(gameNoteID) {
    try{
        console.log('running deleteNote, gameNoteID: ', gameNoteID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameNoteID', sql.Int, gameNoteID);
        let deleteGameNote = await myproc.execute("deleteGameNote")
        console.log('after proc runs, deleteGameNote is: ', deleteGameNote)
        return deleteGameNote;
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
    saveGame: saveGame,
    getGameList : getGameList,
    getFullGameList : getFullGameList,
    getGamePlayers : getGamePlayers,
    getPlayerStatus : getPlayerStatus,
    changePlayerStatus : changePlayerStatus,
    getGameNotes : getGameNotes,
    addNote : addNote,
    deleteGameNote : deleteGameNote,
    deleteGame : deleteGame,
    getGameInfo : getGameInfo,
    editGame : editGame
}