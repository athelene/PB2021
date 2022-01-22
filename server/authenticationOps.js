var config = require('./dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const emailOps = require('./email');

async function invitePlayer(invitePlayerEmail, userID) {
    try{
        console.log('invitePlayerEmail in authOps is: ', invitePlayerEmail);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('invitePlayerEmail', sql.VarChar(128), invitePlayerEmail)
        myproc.input('userID', sql.Int, userID)
        let invitePlayer = await myproc.execute("invitePlayer")
        console.log('invitationCode is: ', invitePlayer)
        if(invitePlayer.returnValue > 0 )
        {let playerEmail = await emailOps.sendInvitation(invitePlayerEmail, invitePlayer.returnValue)
        console.log(playerEmail)}
        else {
            console.log('invitePlayer.returnValue is: ', invitePlayer.returnValue)
        }
        
  //      return invitePlayer.returnValue
    }
    catch (error) {
        console.log(error);
    }
}

async function invitationCheck(userEmail, invitationCode) {
    try{
        console.log('running invitationCheck in authOps');
        console.log('userEmail is: ', userEmail);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail);
        myproc.input('invitationCode', sql.Int, invitationCode);
        let invitationCheck = await myproc.execute("invitationCheck")
        console.log('after proc runs, invitationCheck is: ', invitationCheck.returnValue)
        return invitationCheck.returnValue;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUser(userEmail) {
    try{
        console.log('running getUser ,about to connect to sql');
        console.log('userEmail is: ', userEmail);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail);
        let user = await myproc.execute("getUser")
        console.log('after proc runs, user is: ', user.recordset[0])
        return user.recordset[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function dupCheck(userEmail) {
    try{
        console.log('about to do dupcheck');
        console.log('userEmail is: ', userEmail);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(75), userEmail)
        let dupCheck = await myproc.execute("dupCheck")
        return dupCheck.returnValue
//        return user.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function newUser(userEmail, userDisplayName, userFirst, userLast, userAreaCode, userPrefixCode, userPhoneLine, hash) {
    try{
        console.log('about to connect to newSubscriber in sql');
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
        console.log('about to start function login to connect to sql proc getUser');
        console.log('userEmail is: ', userEmail);

        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userEmail', sql.VarChar(50), userEmail)
        let user = await myproc.execute("validateUser")
        console.log('result from running the proc, before returning to api is: ', user.recordset[0]);
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
    console.log('result from compare is: ', result)})
      if (result === false) {
        return false
      } else {
        authenticationOps.getUser(userEmail).then(result => {
        console.log('user result from azure is:', result);
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