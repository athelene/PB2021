var config = require('./dbconfig');
const sql = require('mssql');

async function getPlayers() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let players = await myproc.execute("getPlayers")
        return players.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getInvitations() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let invitations = await myproc.execute("getOpenInvitations")
        return invitations.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteInvitation(invitationID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('invitationID', sql.Int, invitationID)
        let deleteInvitation = await myproc.execute("deleteInvitation")
        return deleteInvitation.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


async function getPlayer(playerID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('playerID', sql.Int, playerID)
        let player = await myproc.execute("getPlayer")
        return player.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


async function newPlayer(groupName, groupTypeID, groupDescription) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupName', sql.NVarChar(50), groupName);
        myproc.input('groupTypeID', sql.Int, groupTypeID);
        myproc.input('groupDescription', sql.NVarChar(200), groupDescription);
        let newGroup = await myproc.execute("newGroup")
        return newGroup.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('playerID', sql.Int, playerID);
        myproc.input('firstName', sql.NVarChar(50), firstName);
        myproc.input('lastName', sql.NVarChar(50), lastName);
        myproc.input('displayName', sql.NVarChar(120), displayName);
        myproc.input('email', sql.NVarChar(100), email);
        myproc.input('areaCode', sql.NVarChar(3), areaCode);
        myproc.input('prefixCode', sql.NVarChar(3), prefixCode);
        myproc.input('phoneLine', sql.NVarChar(4), phoneLine);
        let editPlayer = await myproc.execute("editPlayer")
        return editPlayer.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMessages() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let messages = await myproc.execute("getMessages")
        return messages.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addMessage(userID, messageText) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('messageText', sql.NVarChar('max'), messageText)
        let addMessage = await myproc.execute("addMessage")
        return addMessage;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getPlayers : getPlayers, 
    getPlayer: getPlayer,
    editPlayer: editPlayer,
    getInvitations: getInvitations,
    deleteInvitation: deleteInvitation,
    getMessages: getMessages,
    addMessage: addMessage

}