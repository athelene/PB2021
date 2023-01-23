//Send email to remind users to pay for reservation
const nodemailer = require("nodemailer");
 const dotenv = require("dotenv");
 dotenv.config();
 const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_DB,
  options: {
      Encrypt: true,
      enableArithPort: true
  },
  port: 1433
}
const sql = require('mssql');

//SEND Player List Email


async function moneyReminderA() {
    //Send email

    try{
      let pool = await sql.connect(config);
      var myproc = new sql.Request(pool);
      myproc.input('ampm', sql.NVarChar(1), 'A')
        //SQL PROC GETS LIST OF PLAYERS FOR NEXT AM GAME, WITH RESERVATION INFO
      let emailList = await myproc.execute("getMoneyEmails")
      let hasReservation = emailList.recordset.some( reservation => reservation['Ireserved'] === 1 )
      if(hasReservation === true) {
      var playerList = '<p>';
      emailList.recordset.forEach(player => {
        var gameDate = player.GameDate.toString()
        if(player.Ireserved === 1){
        playerList = playerList +
        '<strong>' +  
        player.userDisplayName + '</strong>' + 
        " has reserved the gym for your game on " + gameDate.slice(0,10) +
        ". Please remember to bring $5 for your share. <br />"
        } 
      })
      playerList = playerList + '</p>'
        //set up for each code here:
        emailList.recordset.forEach(email => {
          var emailAddress = email.userEmail

            var am_pm = 'AM'

          const mailBody =
          '<h2>' +
          'Reservation Reminder for tomorrow ' + '</h2>' +
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
                pass:  process.env.EMAIL_PW //,  generated ethereal password
              },
            });
        
            // send mail with defined transport object
            let info = transporter.sendMail({
              from: '"Dinking Divas" <dinkinddivas@0-0-2.net>', // sender address
              to: emailAddress, // list of receivers
              subject: "Reminder to bring cash for reservation", // Subject line
              html: mailBody, // html body
            });
            //end of sending email
          }); 
        } else {}
    }
    catch (error) {
      console.log(error);
    }
    
    
      return 
    }

async function moneyReminderP() {
  //Send email


  try{
    let pool = await sql.connect(config);
    var myproc = new sql.Request(pool);
    myproc.input('ampm', sql.NVarChar(1), 'P')
      //SQL PROC GETS LIST OF PLAYERS FOR NEXT AM GAME, WITH RESERVATION INFO
    let emailList = await myproc.execute("getMoneyEmails")
    let hasReservation = emailList.recordset.some( reservation => reservation['Ireserved'] === 1 )
    if(hasReservation === true) {
    var playerList = '<p>';
    emailList.recordset.forEach(player => {
      var gameDate = player.GameDate.toString()
      playerList = playerList +
      '<strong>' +  
      player.userDisplayName + '</strong>' + 
      " has reserved the gym for your game on " + gameDate.slice(0,10) +
      ". Please remember to bring $5 for your share. <br />"
    })
    playerList = playerList + '</p>'
      //set up for each code here:
      emailList.recordset.forEach(email => {
        var emailAddress = email.userEmail

          var am_pm = 'PM'

        const mailBody =
        '<h2>' +
        'Reservation Reminder for tomorrow ' + '</h2>' +
        '<P>' + playerList + '</P> <BR />' + 
        "<h3>Do not reply to this email. To respond, visit the app at http://www.0-0-2.net"
            
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            name: "nw69.fcomet.com",
            host: "nw69.fcomet.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user:  process.env.EMAIL_USER,  //,  generated ethereal user
              pass:  process.env.EMAIL_PW //,  generated ethereal password
            },
          });
      
          // send mail with defined transport object
          let info = transporter.sendMail({
            from: '"Dinking Divas" <dinkingdivas@0-0-2.net>', // sender address
            to: emailAddress, // list of receivers
            subject: "Reminder to bring cash for reservation", // Subject line
            html: mailBody, // html body
          });
          //end of sending email
        }); 
      } else {}
  }
  catch (error) {
    console.log(error);
  }
  
  
    return 
  }

    moneyReminderA();
    moneyReminderP();

