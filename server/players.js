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
        console.log('running getgroup ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        let group = await myproc.execute("getGroup")
        console.log('after proc runs, group is: ', group.recordset)
        return group.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteGroup(playerID) {
    try{
        console.log('running deletegroup ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        let groups = await myproc.execute("deleteGroup")
        console.log('after proc runs, groups is: ', groups.recordset)
        return groups.recordset;
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

async function editPlayer(groupID, groupName, groupTypeID, groupDescription) {
    try{
        console.log('running editGroup ,about to connect to sql', groupTypeID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID);
        myproc.input('groupName', sql.NVarChar(50), groupName);
        myproc.input('groupTypeID', sql.Int, groupTypeID);
        myproc.input('groupDescription', sql.NVarChar(200), groupDescription);
        let editGroup = await myproc.execute("editGroup")
        console.log('after proc runs, groups is: ', editGroup.recordset)
        return editGroup.recordset;
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
    getPlayerGroupsbyPlayer : getPlayerGroupsbyPlayer

}