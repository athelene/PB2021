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

async function getInvitations() {
    try{
        console.log('running getInvitations ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let invitations = await myproc.execute("getOpenInvitations")
        console.log('after proc runs, invitations is: ', invitations.recordset)
        return invitations.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteInvitation(invitationID) {
    try{
        console.log('running deleteinvitation ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('invitationID', sql.Int, invitationID)
        let deleteInvitation = await myproc.execute("deleteInvitation")
        console.log('after proc runs, group is: ', deleteInvitation)
        return deleteInvitation.recordset;
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
        myproc.input('playerID', sql.Int, playerID)
        let player = await myproc.execute("getPlayer")
        console.log('after proc runs, group is: ', player)
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

async function editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine) {
    try{
        console.log('running editGroup ,about to connect to sql', playerID);
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
        console.log('after proc runs, editPlayer is: ', editPlayer.recordset)
        return editPlayer.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMessages() {
    try{
        console.log('running getMessages ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let messages = await myproc.execute("getMessages")
        console.log('after proc runs, messages is: ', messages.recordset)
        return messages.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addMessage(userID, messageText) {
    try{
        console.log('running addNote');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('messageText', sql.NVarChar('max'), messageText)
        let addMessage = await myproc.execute("addMessage")
        console.log('after proc runs, addMessage is: ', addMessage)
        return addMessage;
    }
    catch (error) {
        console.log(error);
    }
}

// async function getPlayerGroupsbyPlayer(userID) {
//     try{
//         console.log('running getPlayerGroupsbyPlayer, groupID: ', userID);
//         let pool = await sql.connect(config);
//         var myproc = new sql.Request(pool);
//         myproc.input('userID', sql.Int, userID)
//         let playerGroupsbyPlayer = await myproc.execute("getPlayerGroupsbyPlayer")
//         console.log('after proc runs, playerGroupsbyPlayer is: ', playerGroupsbyPlayer.recordset)
//         return playerGroupsbyPlayer.recordset;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }


module.exports = {
    getPlayers : getPlayers, 
    getPlayer: getPlayer,
    editPlayer: editPlayer,
    getInvitations: getInvitations,
    deleteInvitation: deleteInvitation,
    getMessages: getMessages,
    addMessage: addMessage

}