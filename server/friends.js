var config = require('./dbconfig');
const sql = require('mssql');
var email = require('./email');

async function getFriends() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let friends = await myproc.execute("getFriends")
        return friends.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteFriend(friendID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('friendID', sql.Int, friendID)
        let deleteFriend = await myproc.execute("deleteFriend")
        return deleteFriend.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


async function addFriend(friendName, friendEmail, submitter) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('submitter', sql.Int, submitter)
        myproc.input('friendName', sql.NVarChar(100), friendName)
        myproc.input('friendEmail', sql.NVarChar(100), friendEmail)
        let addFriend = await myproc.execute("addFriend")
        await email.sendFriendAddedEmail(friendEmail);
    }
    catch (error) {
        console.log(error);
    }
}

async function inviteFriends(gameDate, ampm, userID, sender) {
    try{
        senderName = sender[0].UserDisplayName;
        senderEmail = sender[0].UserEmail;
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        friendList = await myproc.execute("getFriends")

        var mailList = friendList.recordset;

       updateFriendInviteTbl(gameDate, ampm, userID);
        await email.sendInviteFriendsEmail(mailList, gameDate, ampm, senderName, senderEmail);
        return 'inviteFriends table updated';
    }
    catch (error) {
        console.log(error);
    }
}

async function getInvitedFriends(gameDate, ampm) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.VarChar(1), ampm )
        let invitedFriends = await myproc.execute("getInvitedFriends")
        return invitedFriends.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSender(userID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        let sender = await myproc.execute("getSender")
        return sender.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateFriendInviteTbl(gameDate, ampm, userID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('gameDate', sql.Date, gameDate)
        myproc.input('ampm', sql.VarChar(1), ampm)
        let inviteFriends = await myproc.execute("inviteFriends")
        return inviteFriends;
    }
    catch (error) {
        console.log(error);
    }
}

async function quitfriendlist(email) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('friendID', sql.NVarChar(100), email)
        let quitfriendlist = await myproc.execute("quitfriendlist")
        return quitfriendlist;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getFriends : getFriends, 
    deleteFriend: deleteFriend,
    addFriend: addFriend,
    quitfriendlist: quitfriendlist,
    inviteFriends: inviteFriends,
    getSender: getSender,
    updateFriendInviteTbl: updateFriendInviteTbl,
    getInvitedFriends: getInvitedFriends

}