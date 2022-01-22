//Send email to confirm new user
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
var config = require('./dbconfig');
const sql = require('mssql');

async function sendInvitation(email, invitationID) {
  var setLink =
    '<a href="http://0-0-2.net/registration/">' +
    "<button>Click To Get Started</button></a>";
  console.log("starting sendInvitation email, setLink is: ", setLink);
  console.log("starting sendInvitation email");

  const mailBody =
    "<h1>" +
    "You have been invited to join the Dinking Divas pickleball app!</h1>" +
    "<h3>Click on the button below to sign up.</h3>" +
    setLink + "<BR><BR><h3>You will need to enter this invitation code: " + invitationID + '</h3>' +
    "<h3>You will only be able to use this inviation code one time."

  console.log("mailBody reads: ", mailBody);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "nw69.fcomet.com",
    host: "nw69.fcomet.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
      pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
    to: email, // list of receivers
    subject: "You are invited to join the Dinking Divas Pickleball App", // Subject line
    html: mailBody, // html body
  });
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
  return info.accepted;
}

async function sendNote(gameDate, ampm) {
  try{
    console.log('running getNote');
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('gameDate', sql.Date, gameDate)
    myproc.input('ampm', sql.NVarChar(1), ampm)
    let sendNote = await myproc.execute("getNotes")
    console.log('after proc runs, sendNote is: ', sendNote)
    var noteLine = '';
    var noteID = sendNote.recordset.noteID;
    sendNote.recordset.forEach(note => {
      noteLine = noteLine + '<strong>' + 
      note.PlayerName + ', ' + note.NoteDateDisp + ': </strong>' +  note.NoteText + '<BR /><BR />'
      console.log('noteLine in foreach is: ', noteLine)
    }
    );
    console.log('noteLine after foreachis: ', noteLine)
    
}
catch (error) {
    console.log(error);
}
console.log('noteLine after try/catch is: ', noteLine)

  await sendNoteEmail(gameDate, ampm, noteLine, noteID )

}
async function sendNoteEmail(gameDate, ampm, noteLine, noteID) {
//Send email

try{
  console.log('getting Emails');
  let pool = await sql.connect(config);
  var myproc = new sql.Request(pool);
  myproc.input('gameDate', sql.Date, gameDate)
  myproc.input('ampm', sql.NVarChar(1), ampm)
  let emailList = await myproc.execute("getGameEmails")
  console.log('after proc runs, emailList.recordset is: ', emailList.recordset)

    //set up for each code here:
    emailList.recordset.forEach(email => {
      var emailAddress = email.userEmail
      if(ampm === 'A') {
        var am_pm = 'AM'
      } else {
        var am_pm = 'PM'
      }
      const mailBody =
      '<h3>' +
      'New note(s) for your game on ' + gameDate + ', ' + am_pm + '</h3>' +
      '<P>' + noteLine + '</P> <BR />' + 
      "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
    
        console.log("mailBody reads: ", mailBody);
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          name: "nw69.fcomet.com",
          host: "nw69.fcomet.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
            pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
          },
        });
    
        // send mail with defined transport object
        let info = transporter.sendMail({
          from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
          to: emailAddress, // list of receivers
          subject: "New note for your game", // Subject line
          html: mailBody, // html body
        });
        console.log("mail sent", info);
        console.log("Message sent: %s", info.messageId);
        console.log(info.accepted)
        //end of sending email
      });  
}
catch (error) {
  console.log(error);
}


  return 
}

//SEND Player List Email

async function sendPlayerListEmail(gameDate, ampm) {
  //Send email
  
  try{
    console.log('getting PlayerList Emails');
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('gameDate', sql.Date, gameDate)
    myproc.input('ampm', sql.NVarChar(1), ampm)
    let emailList = await myproc.execute("getGameEmails")
    console.log('after proc runs, emailList.recordset is: ', emailList.recordset)
    
    var playerList = '<p>';
    emailList.recordset.forEach(player => {
      playerList = playerList +
      '<strong>' +  
      player.userDisplayName + '</strong>' + 
      ' <a href="tel:' + player.userPhone + '">' + player.userPhone + "</a> <br />"
    })
    playerList = playerList + '</p>'
    console.log('playerList when done is: ', playerList)
      //set up for each code here:
      emailList.recordset.forEach(email => {
        var emailAddress = email.userEmail
        if(ampm === 'A') {
          var am_pm = 'AM'
        } else {
          var am_pm = 'PM'
        }
        const mailBody =
        '<h2>' +
        'Updated player list/details for your game on ' + gameDate + ', ' + am_pm + '</h2>' +
        '<P>' + playerList + '</P> <BR />' + 
        "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
      
          console.log("mailBody reads: ", mailBody);
      
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            name: "nw69.fcomet.com",
            host: "nw69.fcomet.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
              pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
            },
          });
      
          // send mail with defined transport object
          let info = transporter.sendMail({
            from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
            to: emailAddress, // list of receivers
            subject: "New player list for your game", // Subject line
            html: mailBody, // html body
          });
          console.log("mail sent", info);
          console.log("Message sent: %s", info.messageId);
          console.log(info.accepted)
          //end of sending email
        });  
  }
  catch (error) {
    console.log(error);
  }
  
  
    return 
  }

  //send message to group
  async function sendMessage(messageID) {
    var emailText = '';
  try{
    console.log('running getMessage and ID is: ', messageID);
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('messageID', sql.Int, messageID)
    let sendMessage = await myproc.execute("getMessage")
    console.log('after proc runs, sendMessage.recordset is: ', sendMessage.recordset[0])

      emailText = '<strong>' + sendMessage.recordset[0].userDisplayName + ', ' + sendMessage.recordset[0].messageDate + ': </strong><br /><br />' +  sendMessage.recordset[0].messageText 
      console.log('finished emailText is: ', emailText)
    
}
catch (error) {
    console.log(error);
}

  await sendMessageEmail(emailText)

}
  //SEND Message EMAIL to Group
  async function sendMessageEmail(emailText) {
    console.log('emailText received is: ', emailText)
    //Send email
    
    try{
      console.log('getting Emails');
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getEmails")
      console.log('after proc runs, emailList.recordset is: ', emailList.recordset)
    
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          '<P>' + emailText + '</P> <BR />' + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
        
            console.log("mailBody reads: ", emailText);
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
                pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
              },
            });
            console.log('emailAddress just before sending is: ', emailAddress)
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
            console.log("mail sent", info);
            console.log("Message sent: %s", info.messageId);
            console.log(info.accepted)
            //end of sending email
          });  
    }
    catch (error) {
      console.log(error);
    }
    
    
      return 
    }


  //send event invitation to all
  async function sendEventInvitation(eventID) {
    console.log('sendEventInvitation incoming id is: ', eventID)
    var emailText = '';
  try{
    console.log('running sendEventInvitation and ID is: ', eventID);
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)
    let sendEvent = await myproc.execute("getEvent")
    console.log('after proc runs, sendEvent.recordset is: ', sendEvent.recordset[0])
    let eventData = sendEvent.recordset[0]
    console.log('eventData is: ', eventData)
      emailText = 
      '<h3>You are invited to a Dinking Divas Event! Join us for ' + 
      eventData.EventTitle + '<h3>' +
      '<p>Hosted by: ' + eventData.EventHostess + 
      '</p>' + 
      '<p>Date: ' + eventData.EventDate + ' Time: ' + eventData.EventTime + '</p>' +
      '<p>Location: ' + eventData.EventLocation + '</p>' +
      '<p>Details: ' + eventData.EventDetails + '</p>' +
      '<p>Email host: ' + eventData.UserEmail + 
      '  Phone: ' + eventData.userPhone + '</p>'
     
      console.log('finished emailText is: ', emailText)
    
}
catch (error) {
    console.log(error);
}

  await sendEventInvitationEmail(emailText)

}
  //SEND event EMAIL to Group
  async function sendEventInvitationEmail(emailText) {
    console.log('emailText received is: ', emailText)
    //Send email
    
    try{
      console.log('getting Emails');
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getAllEmails")
      console.log('after proc runs, emailList.recordset is: ', emailList.recordset)
    
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          emailText  + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
        
            console.log("mailBody reads: ", emailText);
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
                pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
              },
            });
            console.log('emailAddress just before sending is: ', emailAddress)
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
            console.log("mail sent", info);
            console.log("Message sent: %s", info.messageId);
            console.log(info.accepted)
            //end of sending email
          });  
    }
    catch (error) {
      console.log(error);
    }
    
    
      return 
    }


  //send event cancellation to all
  async function sendEventCancel(eventID) {
    console.log('sendEventCancel incoming id is: ', eventID)
    var emailText = '';
  try{
    console.log('running sendEventCancel and ID is: ', eventID);
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)
    let sendEvent = await myproc.execute("getEvent")
    console.log('after proc runs, sendEvent.recordset is: ', sendEvent.recordset[0])
    let eventData = sendEvent.recordset[0]
    console.log('eventData is: ', eventData)
      emailText = 
      '<h3>This is to notify you that the event titled ' + 
      eventData.EventTitle + ', scheduled for ' + 
      eventData.EventDate + ', has been canceled.<h3>' 
     
      console.log('finished emailText is: ', emailText)
    
}
catch (error) {
    console.log(error);
}

  await sendEventCancelEmail(emailText)

}
  //SEND event EMAIL to Group
  async function sendEventCancelEmail(emailText) {
    console.log('emailText received is: ', emailText)
    //Send email
    
    try{
      console.log('getting Emails');
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getAllEmails")
      console.log('after proc runs, emailList.recordset is: ', emailList.recordset)
    
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          emailText  + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
        
            console.log("mailBody reads: ", emailText);
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "pickleball@athelene.net", // process.env.EMAIL_USER,  generated ethereal user
                pass: "Remember2dink!",  //process.env.EMAIL_PW,  generated ethereal password
              },
            });
            console.log('emailAddress just before sending is: ', emailAddress)
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <pickleball@athelene.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
            console.log("mail sent", info);
            console.log("Message sent: %s", info.messageId);
            console.log(info.accepted)
            //end of sending email
          });  
    }
    catch (error) {
      console.log(error);
    }
    
    
      return 
    }

module.exports = {
  // sendNewMemberConfirmation: sendNewMemberConfirmation,
  // sendEmailChange: sendEmailChange,
  sendInvitation: sendInvitation,
  sendNote: sendNote,
  sendPlayerListEmail: sendPlayerListEmail,
  sendNoteEmail: sendNoteEmail,
  sendMessage: sendMessage,
  sendEventInvitation: sendEventInvitation,
  sendEventInvitationEmail: sendEventInvitationEmail,
  sendEventCancelEmail: sendEventCancelEmail,
  sendEventCancel: sendEventCancel
//  forgot : forgot
};
