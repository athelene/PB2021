var config = require('./dbconfig');
const sql = require('mssql');
var emailOps = require('./email');

async function getEvents() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let events = await myproc.execute("getEvents")
        return events.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAttendees(eventID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let attendees = await myproc.execute("getAttendees")
        return attendees.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEvent(eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails) {
    try{
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
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let deleteEvent = await myproc.execute("deleteEvent")

        return deleteEvent.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEvent(eventID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        let getEvent = await myproc.execute("getEvent")
        return getEvent.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEventStatus(eventID, userID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID);
        myproc.input('userID', sql.Int, userID);
        let getEventStatus = await myproc.execute("getEventStatus")
        if(getEventStatus.returnValue !== 0) {var status = true} else { var status = false}
        return status;
    }
    catch (error) {
        console.log(error);
    }
}

async function acceptRsvp(eventID, userID) {
    try{
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

async function getEventNotes(eventID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('eventID', sql.Int, eventID)
        let getEventNote = await myproc.execute("getEventNotes")
        return getEventNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteEventNote(noteID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('noteID', sql.Int, noteID)
        let deleteEventNote = await myproc.execute("deleteEventNote")
        return deleteEventNote;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEventNote(userID, eventID, noteText) {
    console.log('addEventNotes params in events.js are: ', userID, eventID, noteText)
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('userID', sql.Int, userID)
        myproc.input('eventID', sql.Int, eventID)
        myproc.input('noteText', sql.NVarChar('max'), noteText)
        let addEventNote = await myproc.execute("addEventNote")
        return addEventNote;
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
    addEventNote: addEventNote,
    deleteEventNote: deleteEventNote,
    getEventNotes: getEventNotes

}