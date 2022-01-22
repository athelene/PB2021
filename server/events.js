var config = require('./dbconfig');
const sql = require('mssql');
var emailOps = require('./email');

async function getEvents() {
    try{
        console.log('running getEvents ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let events = await myproc.execute("getEvents")
        console.log('after proc runs, events is: ', events.recordset)
        return events.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAttendees(eventID) {
    try{
        console.log('running getAttendees about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let attendees = await myproc.execute("getAttendees")
        console.log('after proc runs, getAttendees is: ', attendees.recordset)
        return attendees.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEvent(eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails) {
    try{
        console.log('running addEvent ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventTitle', sql.NVarChar(100), eventTitle);
        myproc.input('eventHostess', sql.Int, eventHostess);
        myproc.input('eventLocation', sql.NVarChar(100), eventLocation);
        myproc.input('eventDate', sql.Date, eventDate);
        myproc.input('eventTime', sql.NVarChar(10), eventTime);
        myproc.input('inviteBringing', sql.Int, inviteBringing);
        myproc.input('eventDetails', sql.NVarChar('MAX'), eventDetails);
        let newEvent = await myproc.execute("addEvent")
        console.log('after proc runs, newEvent is: ', newEvent.recordset[0].Identity)
        emailOps.sendEventInvitation(newEvent.recordset[0].Identity)
        return newEvent.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteEvent(eventID) {
    try{
        await emailOps.sendEventCancel(eventID)
        console.log('running deleteEvent ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let deleteEvent = await myproc.execute("deleteEvent")
        console.log('after proc runs, deleteEvent is: ', deleteEvent.recordset)

        return deleteEvent.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEvent(eventID) {
    try{
        console.log('running deleteEvent ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let getEvent = await myproc.execute("getEvent")
        console.log('after proc runs, getEvent is: ', getEvent.recordset)
        return getEvent.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEventStatus(eventID, userID) {
    try{
        console.log('running deleteEvent ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        myproc.input('userID', sql.Int, userID);
        let getEventStatus = await myproc.execute("getEventStatus")
        console.log('after proc runs, getEventStatus is: ', getEventStatus.returnValue)
        if(getEventStatus.returnValue !== 0) {var status = true} else { var status = false}
        return status;
    }
    catch (error) {
        console.log(error);
    }
}

async function acceptRsvp(eventID, userID) {
    try{
        console.log('running acceptRsvp ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        myproc.input('userID', sql.Int, userID);
        let acceptRsvp = await myproc.execute("acceptRsvp")
        return acceptRsvp;
    }
    catch (error) {
        console.log(error);
    }
}

async function cancelRsvp(eventID, userID) {
    try{
        console.log('running cancelRsvp ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        myproc.input('userID', sql.Int, userID);
        let cancelRsvp = await myproc.execute("cancelRsvp")
        return cancelRsvp;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEvents : getEvents,
    addEvent: addEvent,
    deleteEvent: deleteEvent,
    getEvent: getEvent,
    getEventStatus: getEventStatus,
    getAttendees: getAttendees,
    acceptRsvp: acceptRsvp,
    cancelRsvp: cancelRsvp,

}