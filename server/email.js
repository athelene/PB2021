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

  const mailBody =
    "<h1>" +
    "You have been invited to join the Dinking Divas pickleball app!</h1>" +
    "<h3>Click on the button below to sign up.</h3>" +
    setLink + "<BR><BR><h3>You will need to enter this invitation code: " + invitationID + '</h3>' +
    "<h3>You will only be able to use this inviation code one time."


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "nw69.fcomet.com",
    host: "nw69.fcomet.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:  process.env.EMAIL_USER, //,  generated ethereal user
      pass: process.env.EMAIL_PW //,  generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
    to: email, // list of receivers
    subject: "You are invited to join the Dinking Divas Pickleball App", // Subject line
    html: mailBody, // html body
  });
  return info.accepted;
}

async function sendNote(gameDate, ampm) {
  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('gameDate', sql.Date, gameDate)
    myproc.input('ampm', sql.NVarChar(1), ampm)
    let sendNote = await myproc.execute("getNotes")
    var noteLine = '';
    var noteID = sendNote.recordset.noteID;
    sendNote.recordset.forEach(note => {
      noteLine = noteLine + '<strong>' + 
      note.PlayerName + ', ' + note.NoteDateDisp + ': </strong>' +  note.NoteText + '<BR /><BR />'
    }
    );
    
}
catch (error) {
    console.log(error);
}

  await sendNoteEmail(gameDate, ampm, noteLine, noteID )

}

async function sendNoteEmail(gameDate, ampm, noteLine, noteID) {

try{
  let pool = await sql.connect(config);
  var myproc = new sql.Request(pool);
  myproc.input('gameDate', sql.Date, gameDate)
  myproc.input('ampm', sql.NVarChar(1), ampm)
  let emailList = await myproc.execute("getGameEmails")

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
        
        // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            name: "nw69.fcomet.com",
            host: "nw69.fcomet.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user:  process.env.EMAIL_USER, //,  generated ethereal user
              pass: process.env.EMAIL_PW //,  generated ethereal password
            },
          });
    
        // send mail with defined transport object
        let info = transporter.sendMail({
          from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
          to: emailAddress, // list of receivers
          subject: "New note for your game", // Subject line
          html: mailBody, // html body
        });
        //end of sending email
      });  
}
catch (error) {
  console.log(error);
}


  return 
}

//SEND EVENT NOTE

async function sendEventNote(eventID) {
  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)

    var theDate = await myproc.execute("getEventDate")
    let sendNote = await myproc.execute("getEventNotes")
    var noteLine = '';
    sendNote.recordset.forEach(note => {
      noteLine = noteLine + '<strong>' + 
      note.PlayerName + ', ' + note.NoteDateDisp + ': </strong>' +  note.NoteText + '<BR /><BR />'
    }
    );
    console.log('noteLine is: ', noteLine)
}
catch (error) {
    console.log(error);
}

  await sendEventNoteEmail(eventID, noteLine, theDate.recordset[0].EventDate )

}

async function sendEventNoteEmail(eventID, noteLine, eventDate) {
  console.log('params are: ', eventID, noteLine, eventDate)
  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)
    let emailList = await myproc.execute("getEventEmails")
    console.log('the email list for sending is: ', emailList)
  
      //set up for each code here:
      emailList.recordset.forEach(email => {
        var emailAddress = email.userEmail
        const mailBody =
        '<h3>' +
        'New note(s) for your Event on ' + eventDate + '</h3>' +
        '<P>' + noteLine + '</P> <BR />' + 
        "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
          
          // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user:  process.env.EMAIL_USER, //,  generated ethereal user
                pass: process.env.EMAIL_PW //,  generated ethereal password
              },
            });
      
          // send mail with defined transport object
          let info = transporter.sendMail({
            from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
            to: emailAddress, // list of receivers
            subject: "New note for your event", // Subject line
            html: mailBody, // html body
          });
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
  const gamedatetime = gameDate + 'T10:24:00'
  const gameDay = new Date(gamedatetime)
  let gameDow = 'NA'
  switch (gameDay.getDay()) {
    case 0:
       gameDow = 'Sunday';
      break;
    case 1:
       gameDow = 'Monday';
      break;
    case 2:
       gameDow = 'Tuesday';
      break;
      case 2:
         gameDow = 'Tuesday';
        break;
      case 3:
         gameDow = 'Wednesday';
        break;
      case 4:
         gameDow = 'Thursday';
        break;
      case 5:
         gameDow = 'Friday';
        break;
      case 6:
         gameDow = 'Saturday';
        break;
      case 7:
         gameDow = 'Sunday';
        break;
    default:
       gameDow = 'NA';
  }

  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('gameDate', sql.Date, gameDate)
    myproc.input('ampm', sql.NVarChar(1), ampm)
    let emailList = await myproc.execute("getGameEmails")
    
    var playerList = '<p>';
    emailList.recordset.forEach(player => {
      playerList = playerList +
      '<strong>' +  
      player.userDisplayName + '</strong>' + 
      ' <a href="tel:' + player.userPhone + '">' + player.userPhone + "</a>, " + player.StartTime2 + " <br />"
    })
    playerList = playerList + '</p>'
      //set up for each code here:
      emailList.recordset.forEach(email => {
        var emailAddress = email.userEmail
        if(ampm === 'A') {
          var am_pm = 'AM'
        } else {
          var am_pm = 'PM'
        }
        const emailSubject = "New player list for your game on " + gameDow + ', ' + gameDate.substring(5) + ' ' + am_pm;
        const mailBody =
        '<h2>' +
        'Updated player list/details for your game on ' + gameDow + ', ' + gameDate.substring(5) + ', ' + am_pm + '</h2>' +
        '<P>' + playerList + '</P> <BR />' + 
        "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
            
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            name: "nw69.fcomet.com",
            host: "nw69.fcomet.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user:  process.env.EMAIL_USER, //,  generated ethereal user
              pass: process.env.EMAIL_PW //,  generated ethereal password
            },
          });
      
          // send mail with defined transport object
          let info = transporter.sendMail({
            from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
            to: emailAddress, // list of receivers
            subject: emailSubject, // Subject line
            html: mailBody, // html body
          });

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

    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('messageID', sql.Int, messageID)
    let sendMessage = await myproc.execute("getMessage")

      emailText = '<strong>' + sendMessage.recordset[0].userDisplayName + ', ' + sendMessage.recordset[0].messageDate + ': </strong><br /><br />' +  sendMessage.recordset[0].messageText 
    
}
catch (error) {
    console.log(error);
}

  await sendMessageEmail(emailText)

}
  //SEND Message EMAIL to Group
  async function sendMessageEmail(emailText) {
    //Send email
    
    try{
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getEmails")
    var todayIs = new Date();
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          '<P>' + emailText + '</P> <BR />' + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
                
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user:  process.env.EMAIL_USER,  //generated ethereal user
                pass:  process.env.EMAIL_PW  //,  generated ethereal password
              },
            });
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
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
    var emailText = '';
  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)
    let sendEvent = await myproc.execute("getEvent")
    let eventData = sendEvent.recordset[0]
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
         
}
catch (error) {
    console.log(error);
}

  await sendEventInvitationEmail(emailText)

}
  //SEND event EMAIL to Group
  async function sendEventInvitationEmail(emailText) {
    //Send email
    
    try{
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getAllEmails")
    
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          emailText  + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
                
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL_USER, //,  generated ethereal user
                pass: process.env.EMAIL_PW //,  generated ethereal password
              },
            });
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
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
    var emailText = '';
  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('eventID', sql.Int, eventID)
    let sendEvent = await myproc.execute("getEvent")
    let eventData = sendEvent.recordset[0]
      emailText = 
      '<h3>This is to notify you that the event titled ' + 
      eventData.EventTitle + ', scheduled for ' + 
      eventData.EventDate + ', has been canceled.<h3>' 
         
}
catch (error) {
    console.log(error);
}

  await sendEventCancelEmail(emailText)

}
  //SEND event EMAIL to Group
  async function sendEventCancelEmail(emailText) {
    //Send email
    
    try{
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      let emailList = await myproc.execute("getAllEmails")
    
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail
          const mailBody =
          emailText  + 
          "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
                
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              name: "nw69.fcomet.com",
              host: "nw69.fcomet.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL_USER, //,  generated ethereal user
                pass: process.env.EMAIL_PW //,  generated ethereal password
              },
            });
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "New message from Dinking Divas", // Subject line
              html: mailBody, // html body
            });
            //end of sending email
          });  
    }
    catch (error) {
      console.log(error);
    }
    
    
      return 
    }

    async function sendFriendAddedEmail(email) {
      var setLink =
       '<a href="http://0-0-2.net/quitfriendlist?friendID=' + encodeURIComponent(email) + '">' +
 ///       '<a href="localhost//:8080/quitfriendlist?friendID=' + encodeURIComponent(email) + '">' +
        "<button>Click here to remove your name from our friends list</a>";
    
      const mailBody =
        "<h1>" +
        "You have been added to the Dinking Divas friends list. </h1>" +
        "<h2>From time to time, we invite our friends to play with our group. When we do, you will get an email notice. " + 
        "If you do not want to receive these emails, just click on the button below to remove your name. " + 
        "We look forward to playing with you!</h2>" + 
        setLink 
        
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        name: "nw69.fcomet.com",
        host: "nw69.fcomet.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user:  process.env.EMAIL_USER, //,  generated ethereal user
          pass: process.env.EMAIL_PW //,  generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
        to: email, // list of receivers
        subject: "You have been added to the Dinking Divas Friend List", // Subject line
        html: mailBody, // html body
      });
      return info.accepted;
    }

    async function sendInviteFriendsEmail(mailList, gameDate, ampm, senderName, senderEmail) {
      if(ampm === 'A') {
        var gameTime = 'morning'
      } else {
        var gameTime = 'afternoon'
      }
      mailList.forEach(mailee => {
        var setLink =
        '<a href="http://0-0-2.net/quitfriendlist?friendID=' + encodeURIComponent(mailee.FriendEmail) + '">' +
         "<button>Click here to remove your name from our friends list</a>";
     
       const mailBody =
         "<h2>" +
         "Hi Friend, <br>You're invited! <br> " + senderName + " is inviting you to join the Divas for a pickleball game on the " + gameTime + " of " + gameDate.substring(5) + ".</h2>" +
         "<h3><strong>If you are available to play, please hit reply to  let " + senderName + " know. We look forward to playing with you!</strong></p>" + 
         "<br><br><br><hr></h3>" + 
         "<p>If you do not want to receive these emails, just click on the button below to remove your name. <br><br>" + 

         setLink 
          
       // create reusable transporter object using the default SMTP transport
       let transporter = nodemailer.createTransport({
         name: "nw69.fcomet.com",
         host: "nw69.fcomet.com",
         port: 465,
         secure: true, // true for 465, false for other ports
         auth: {
           user:  process.env.EMAIL_USER, //,  generated ethereal user
           pass: process.env.EMAIL_PW //,  generated ethereal password
         },
       });
     
       // send mail with defined transport object
       let info = transporter.sendMail({
         from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
         to: mailee.FriendEmail, // list of receivers
         replyTo: senderEmail,
         subject: "Please join us for a game", // Subject line
         html: mailBody, // html body
       });
       return info.accepted;

      })

    }

module.exports = {

  sendInvitation: sendInvitation,
  sendNote: sendNote,
  sendPlayerListEmail: sendPlayerListEmail,
  sendNoteEmail: sendNoteEmail,
  sendMessage: sendMessage,
  sendEventInvitation: sendEventInvitation,
  sendEventInvitationEmail: sendEventInvitationEmail,
  sendEventCancelEmail: sendEventCancelEmail,
  sendEventCancel: sendEventCancel,
  sendFriendAddedEmail: sendFriendAddedEmail,
  sendInviteFriendsEmail: sendInviteFriendsEmail,
  sendEventNoteEmail: sendEventNoteEmail,
  sendEventNote: sendEventNote
//  forgot : forgot
};
