const dotenv = require('dotenv');
const config = require('./dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const emailOps = require('./email');

async function invitePlayer(invitePlayerEmail, userID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('invitePlayerEmail', sql.VarChar(128), invitePlayerEmail)
        myproc.input('userID', sql.Int, userID)
        let invitePlayer = await myproc.execute("invitePlayer")
        if(invitePlayer.returnValue > 0 )
        {let playerEmail = await emailOps.sendInvitation(invitePlayerEmail, invitePlayer.returnValue)
        }
        else {
        }
        
  //      return invitePlayer.returnValue
    }
    catch (error) {
        console.log(error);
    }
}

async function invitationCheck(userEmail, invitationCode) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail);
        myproc.input('invitationCode', sql.Int, invitationCode);
        let invitationCheck = await myproc.execute("invitationCheck")
        return invitationCheck.returnValue;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUser(userEmail) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail);
        let user = await myproc.execute("getUser")
        return user.recordset[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function dupCheck(userEmail) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail)
        let dupCheck = await myproc.execute("dupCheck")
        return dupCheck.returnValue
    }
    catch (error) {
        console.log(error);
    }
}

async function newUser(userEmail, userDisplayName, userFirst, userLast, userAreaCode, userPrefixCode, userPhoneLine, hash) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(128), userEmail)
        myproc.input('userHash', sql.VarChar(75), hash)
        myproc.input('userFirst', sql.VarChar(75), userFirst)
        myproc.input('userLast', sql.VarChar(75), userLast)
        myproc.input('userDisplayName', sql.VarChar(120), userDisplayName)
        myproc.input('userPhoneAreaCode', sql.VarChar(3), userAreaCode)
        myproc.input('userPhonePrefix', sql.VarChar(3), userPrefixCode)
        myproc.input('userPhoneLine', sql.VarChar(4), userPhoneLine)
        let userQry = await myproc.execute("newSubscriber")
        let user = userQry.recordset;
        return user;
    }
    catch (error) {
        console.log(error);
    }
}

async function login(userEmail) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(50), userEmail)
        let user = await myproc.execute("validateUser")
        console.log('user returned is: ', user)
        if (user.recordset[0]) {
        return user.recordset[0];}
        else {
        return 'Invalid Login'
        }

    }
    catch (error) {
        console.log(error);
    }
}

async function passwordCompare(userHash, userPassword, userEmail) {
    try{
    bcrypt.compare(userPassword, userHash, function(err, result) {
    })
      if (result === false) {
        return false
      } else {
        authenticationOps.getUser(userEmail).then(result => {
        return result;
            } ) }

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUser : getUser,
    login : login,
    newUser : newUser,
    dupCheck : dupCheck, 
    passwordCompare : passwordCompare,
    invitePlayer: invitePlayer,
    invitationCheck: invitationCheck
}