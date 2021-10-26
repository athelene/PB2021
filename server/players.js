var config = require('./dbconfig');
const sql = require('mssql');

async function getPlayers() {
    try{
        console.log('running getPlayers ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let players = await myproc.execute("getPlayers")
        console.log('after proc runs, players is: ', players.recordset)
        return players.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayer(playerID) {
    try{
        console.log('running getPlayer ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('playerID', sql.Int, playerID)
        let player = await myproc.execute("getPlayer")
        console.log('after proc runs, player is: ', player.recordset)
        return player.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deletePlayer(playerID) {
    try{
        console.log('running deletePlayer ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('playerID', sql.Int, playerID)
        let player = await myproc.execute("deletePlayer")
        console.log('after proc runs, player is: ', player.recordset)
        return player.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function newPlayer(groupName, groupTypeID, groupDescription) {
    try{
        console.log('running newGroup ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupName', sql.NVarChar(50), groupName);
        myproc.input('groupTypeID', sql.Int, groupTypeID);
        myproc.input('groupDescription', sql.NVarChar(200), groupDescription);
        let newGroup = await myproc.execute("newGroup")
        console.log('after proc runs, groups is: ', newGroup.recordset)
        return newGroup.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function editPlayer(playerID, firstName, lastName, displayName, email) {
    try{
        console.log('running editPlayer ,about to connect to sql', playerID, email);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('playerID', sql.Int, playerID);
        myproc.input('firstName', sql.NVarChar(50), firstName);
        myproc.input('lastName', sql.NVarChar(50), lastName);
        myproc.input('displayName', sql.NVarChar(120), displayName);
        myproc.input('email', sql.NVarChar(100), email);
        let editPlayer = await myproc.execute("editPlayer")
        console.log('after proc runs, groups is: ', editPlayer.recordset)
        return editPlayer.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerGroupsbyPlayer(userID) {
    try{
        console.log('running getPlayerGroupsbyPlayer, groupID: ', userID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        let playerGroupsbyPlayer = await myproc.execute("getPlayerGroupsbyPlayer")
        console.log('after proc runs, playerGroupsbyPlayer is: ', playerGroupsbyPlayer.recordset)
        return playerGroupsbyPlayer.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getPlayers : getPlayers, 
    getPlayerGroupsbyPlayer : getPlayerGroupsbyPlayer,
    deletePlayer:  deletePlayer,
    getPlayer: getPlayer,
    editPlayer: editPlayer

}