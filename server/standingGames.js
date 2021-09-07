var config = require('./dbconfig');
const sql = require('mssql');

async function saveStandingGame(gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID) {
    try{
        console.log('running saveGame,about to connect to sql');
        console.log('gameCourt is : ', gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameStart', sql.DateTime, gameStart)
        myproc.input('gameEnd', sql.DateTime, gameEnd)
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        myproc.input('gameGroup', sql.Int, gameGroup)
        myproc.input('weekday', sql.Int, weekday)
        myproc.input('userID', sql.Int, userID)
        let saveStandingGame = await myproc.execute("saveStandingGame")
        console.log('after proc runs, saveGame is: ', saveStandingGame)
        return saveStandingGame;
    }
    catch (error) {
        console.log(error);
    }
}

async function getStandingGameList() {
    try{
        console.log('running getStandingGameList,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let sgameList = await myproc.execute("getStandingGameList")
        console.log('after proc runs, gameList is: ', sgameList.recordset)
        return sgameList.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteStandingGame(standingGameID) {
    try{
        console.log('running deleteStandingGame, standingGameID: ', standingGameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('standingGameID', sql.Int, standingGameID);
        let deleteStandingGame = await myproc.execute("deleteStandingGame")
        console.log('after proc runs, deleteStandingGame is: ', deleteStandingGame)
        return deleteStandingGame.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getStandingGameInfo(gameID) {
    try{
        console.log('running getStandingGameInfo, gameID: ', gameID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        let standingGameInfo = await myproc.execute("getStandingGameInfo")
        console.log('after proc runs, gameInfo is: ', standingGameInfo)
        return standingGameInfo.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function editStandingGame(gameID, gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID) {
    try{
        console.log('running editStandingGame,about to connect to sql');
        console.log('game input: ', gameID, gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID)
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameID', sql.Int, gameID);
        myproc.input('gameStart', sql.DateTime, gameStart)
        myproc.input('gameEnd', sql.DateTime, gameEnd)
        myproc.input('gameGroup', sql.Int, gameGroup)
        myproc.input('selectedCourt', sql.Int, selectedCourt)
        myproc.input('weekday', sql.Int, weekday)
        myproc.input('userID', sql.Int, userID)
        let editStandingGame = await myproc.execute("editStandingGame")
        console.log('after proc runs, editGame is: ', editStandingGame)
        return editStandingGame;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {

    getStandingGameList : getStandingGameList,
    saveStandingGame : saveStandingGame,
    deleteStandingGame : deleteStandingGame,
    getStandingGameInfo : getStandingGameInfo,
    editStandingGame : editStandingGame
}