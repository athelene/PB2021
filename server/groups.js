var config = require('./dbconfig');
const sql = require('mssql');

async function getGroups(userID) {
    try{
        console.log('running getgroups ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        let groups = await myproc.execute("getGroups")
        console.log('after proc runs, groups is: ', groups.recordset)
        return groups.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getGroup(groupID) {
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

async function deleteGroup(groupID) {
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

async function newGroup(groupName, groupTypeID, groupDescription) {
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

async function editGroup(groupID, groupName, groupTypeID, groupDescription) {
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

async function getGroupTypes() {
    try{
        console.log('running getgrouptypes ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let groupTypes = await myproc.execute("getGroupTypes")
        console.log('after proc runs, groups is: ', groupTypes.recordset)
        return groupTypes.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
async function getAllGroups() {
    try{
        console.log('running getgroups ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let allgroups = await myproc.execute("getAllGroups")
        console.log('after proc runs, groups is: ', allgroups.recordset)
        return allgroups.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getGroupPlayers(groupID) {
    try{
        console.log('running getGroupPlayers, groupID: ', groupID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        let groupPlayers = await myproc.execute("getGroupPlayers")
        console.log('after proc runs, groupPlayers is: ', groupPlayers.recordset)
        return groupPlayers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerGroupStatus(groupID) {
    try{
        console.log('running getGroupPlayers, groupID: ', groupID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        let playerGroupStatus = await myproc.execute("getPlayerGroupStatus")
        console.log('after proc runs, playerGroupStatus is: ', playerGroupStatus.recordset)
        return playerGroupStatus.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getGroupStatus(groupID, userID) {
    try{
        console.log('running getGroupPlayers, groupID: ', groupID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        myproc.input('userID', sql.Int, userID)
        let groupStatus = await myproc.execute("getGroupStatus")
        console.log('after proc runs, groupStatus is: ', groupStatus.recordset)
        return groupStatus.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addToGroup(groupID, userID) {
    try{
        console.log('running addToGroup, groupID: ', groupID, userID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        myproc.input('userID', sql.Int, userID)
        let groupStatus = await myproc.execute("addToGroup")
        console.log('after proc runs, addToGroup is: ', groupStatus.recordset)
        return groupStatus.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function removeFromGroup(groupID, userID) {
    try{
        console.log('running removeFromGroup, groupID: ', groupID, userID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('groupID', sql.Int, groupID)
        myproc.input('userID', sql.Int, userID)
        let groupStatus = await myproc.execute("removeFromGroup")
        console.log('after proc runs, removeFromGroup is: ', groupStatus.recordset)
        return groupStatus.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPlayerGroups(userID) {
    try{
        console.log('running getPlayerGroups, groupID: ', userID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        let playerGroups = await myproc.execute("getPlayerGroups")
        console.log('after proc runs, playerGroups is: ', playerGroups.recordset)
        return playerGroups.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getGroupPlayers : getGroupPlayers,
    getGroupStatus : getGroupStatus,
    addToGroup : addToGroup,
    removeFromGroup : removeFromGroup,
    getPlayerGroups : getPlayerGroups,
    getGroups: getGroups,
    getAllGroups: getAllGroups,
    deleteGroup : deleteGroup,
    getGroupTypes : getGroupTypes,
    newGroup : newGroup,
    getGroup : getGroup,
    editGroup : editGroup,
    getPlayerGroupStatus : getPlayerGroupStatus

}