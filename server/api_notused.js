require("dotenv").config();
const bodyParser = require('body-parser');
const authenticationOps = require("./authenticationOps");
const games = require("./games");
const faq = require("./faq");
const players = require("./players");
const friends = require("./friends");
const events = require("./events");
const bcrypt = require("bcrypt");
const fs = require("fs");
 const jwt = require('jsonwebtoken');
 const checkAuth = require('./check-auth.js');
var express = require("express");
const { response } = require("express");
const email = require("./email");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}


app.use((req, res, next) => {
//    res.header("Access-Control-Allow-Origin", "https://zerozerostart.herokuapp.com")
if(process.env.NODE_ENV !== 'production') {
  res.header("Access-Control-Allow-Origin", "*");
  }
   if(process.env.NODE_ENV === 'production') {
   res.header("Access-Control-Allow-Origin", "https://zerozerostart.herokuapp.com")
   }

  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


var router = express.Router();
//app.use("/api", router);
app.use("/", router);

router.use((request, response, next) => {

  next();
});


//PB APIs

//Get Messages
app.get('/getMessages', function (req, res) {
    players.getMessages()
    .then(result => {
     res.send(result) 
})  
});

  //Add Message
  app.get('/addMessage', function (req, res) {
    var userID = req.query.userID;
    var messageText = req.query.messageText;
    var newMessageID = '';
      players.addMessage(userID, messageText)
      .then(result => {
        newMessageID = result.returnValue;
        return newMessageID 
  })  
      .then((newMessageID) => {
        email.sendMessage(newMessageID)
      res.send() 
      })
  });
//Set user's first available time
app.get('/setmytime', function (req, res) {
    var gameDate = req.query.gameDate;
    var selectedTime = req.query.selectedTime;
    var userID = req.query.userID;
    var ampm = req.query.ampm;
    var locationPref = req.query.locationPref;
    var myReservation = req.query.myReservation;
    var guestCount = req.query.guestCount;
      games.setMyTime(gameDate, selectedTime, userID, ampm, locationPref, myReservation, guestCount).then(result => {
       res.send(result) 
  })  
  });
  
  //Set user's first available time
  app.get('/getmytime', function (req, res) {
    var gameDate = req.query.gameDate;
    var userID = req.query.userID;
    var ampm = req.query.ampm;
      games.getMyTime(gameDate, Number(userID), ampm).then(result => {
       res.send(result) 
  })  
  });
  
  //Set user's first available time
  app.get('/getearliesttime', function (req, res) {
    var gameDate = req.query.gameDate;
    var ampm = req.query.ampm;
      games.getEarliestTime(gameDate, ampm).then(result => {
       res.send(result) 
  })  
  });
  
  //Set user's first available time
  app.get('/getplayercount', function (req, res) {
    var gameDate = req.query.gameDate;
    var ampm = req.query.ampm;
      games.getPlayerCount(gameDate, ampm).then(result => {
       res.send(result) 
  })  
  });
  
   //Set user's first available time
  app.get('/resigngame', function (req, res) {
    var userID = req.query.userID;
    var gameDate = req.query.gameDate;
    var ampm = req.query.ampm;
      games.resignGame(userID, gameDate, ampm).then(result => {
       res.send(result) 
  })  
  });

//Get Notes
app.get('/getNotes', function (req, res) {
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
    games.getNotes(gameDate, ampm)
    .then(result => {
     res.send(result) 
})  
});

    //Delete a Note
    app.get('/deleteNote', function (req, res) {
      var noteID = req.query.noteID;
        games.deleteNote(noteID)
        .then(result => {
         res.send(result) 
    })  
    });

  //Add Note
app.get('/addNote', function (req, res) {
  var userID = req.query.userID;
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  var noteText = req.query.noteText;
    games.addNote(userID, gameDate, ampm, noteText)
    .then(result => {
     res.send(result) 
})  
.then(() => {
        email.sendNote(gameDate, ampm)
      res.send() 
      })
  });



//GET Players
app.get('/getPlayers', function (req, res) {
    players.getPlayers().then(result => {
     res.send(result) 
})  
});

//GET Friends
app.get('/getFriends', function (req, res) {
      friends.getFriends().then(result => {
       res.send(result) 
  })  
  });

//Set user's first available time
app.get('/addFriend', function (req, res) {
  var friendName = req.query.friendName;
  var friendEmail = req.query.friendEmail;
  var submitter = req.query.submitter;
    friends.addFriend(friendName, friendEmail, submitter ).then(result => {
     res.send(result) 
})  
});

//delete friend
app.get('/deleteFriend', function (req, res) {
  var friendID = req.query.friendID;
    friends.deleteFriend(friendID).then(result => {
     res.send(result) 
})  
});

//invite friends
app.get('/inviteFriends', function (req, res) {
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  var userID = req.query.userID;
  friends.getSender(userID)
  .then(sender => {
    friends.inviteFriends(gameDate, ampm, userID, sender)
  })
  .then(result => {
     res.send('Friends invited from api') 
})  
});

//invite friends
app.get('/getInvitedFriends', function (req, res) {
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  friends.getInvitedFriends(gameDate, ampm)
  .then(result => {
     res.send(result) 
})  
});


//quit friend list
app.get('/quitfriendlist', function (req, res) {
  var friendID = req.query.friendID;
    friends.quitfriendlist(friendID).then(() => {
     res.send("You have been removed from the Dinking Divas friend list.") 
})  
});

//GET Invitations
app.get('/getInvitations', function (req, res) {
    players.getInvitations().then(result => {
     res.send(result) 
})  
});

    //Delete an invitation
    app.get('/deleteInvitation', function (req, res) {
      var invitationID = req.query.invitationID;
        players.deleteInvitation(invitationID)
        .then(result => {
         res.send(result) 
    })  
    });

//GET Player for edit
app.get('/getPlayer', function (req, res) {
  var playerID = req.query.playerID;
    players.getPlayer(playerID).then(result => {
     res.send(result) 
})  
});

//Edit Player
app.get('/editPlayer', function (req, res) {
  var playerID = req.query.playerID;
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var displayName = req.query.displayName;
  var email = req.query.email;
  var areaCode = req.query.areaCode;
  var prefixCode = req.query.prefixCode;
  var phoneLine = req.query.phoneLine;
    players.editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine)
    .then(result => {
     res.send(result) 
})  
});

//AUTHENTICATION ROUTES

//Invite a new player

app.get('/invitePlayer', function (req, res) {
  var invitePlayerEmail = req.query.invitePlayerEmail;
  var userID = req.query.userID;
  authenticationOps.dupCheck(invitePlayerEmail).then((result) => {
    if (result === 1) {
      res.send("duplicate");
    } else {
      authenticationOps.invitePlayer(invitePlayerEmail, userID)
    .then(result => {
     res.send()
    })
  }
  })
})

//Set user's first available time
app.get('/addFaq', function (req, res) {
  var faqQuestion = req.query.faqQuestion;
  var faqAnswer = req.query.faqAnswer;
    faq.addFaq(faqQuestion, faqAnswer ).then(result => {
     res.send(result) 
})  
});

//Set user's first available time
app.get('/getFaqs', function (req, res) {
    faq.getFaqs().then(result => {
     res.send(result) 
})  
});

//get faq to edit 
app.get('/getFaq', function (req, res) {
  var faqID = req.query.faqID;
    faq.getFaq(faqID).then(result => {
     res.send(result) 
})  
});

//edit an faq
app.get('/editFaq', function (req, res) {
  var faqID = req.query.faqID;
  var faqQuestion = req.query.faqQuestion;
  var faqAnswer = req.query.faqAnswer;
    faq.editFaq(faqID, faqQuestion, faqAnswer).then(result => {
     res.send(result) 
})  
});

//delete an faq
app.get('/deleteFaq', function (req, res) {
  var faqID = req.query.faqID;
    faq.deleteFaq(faqID).then(result => {
     res.send(result) 
})  
});


 //registers a new user
app.get("/register", function (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
  var userDisplayName = req.query.userDisplayName;
  var userFirst = req.query.userFirst;
  var userLast = req.query.userLast;
  var userAreaCode = req.query.userAreaCode;
  var userPrefixCode = req.query.userPrefixCode;
  var userPhoneLine = req.query.userPhoneLine;
  var saltRounds = 10;
  var randomVerify = Math.floor(Math.random() * 100000);
  //randomVerify = userPassword.substring(1, 1) + randomVerify;
  bcrypt.hash(userPassword, saltRounds, function (err, hash) {

    authenticationOps
      .newUser(userEmail, userDisplayName, userFirst, userLast, userAreaCode, userPrefixCode, userPhoneLine, hash)
      .then((result) => {
        const list = result;
        res.send(list);
      });
  });
});


//User verifies signup
// app.get("/verify", function (req, res) {
//   var userID = decodeURI(req.query.userID);
//   var verifyCode = req.query.verifyCode;
//   authenticationOps.verify(verifyCode, userID).then((result) => {

//     if (process.env.SERVER_STATUS === "Dev") {
//       res.redirect(302, "http://localhost:8080/login");
//     } else {
//       res.redirect(302, "https://login.memoriesforus.com");
//     }
//   });
// });

// //Gets User by email
// app.get("/user", checkAuth, function (req, res) {
//   var userEmail = req.query.userEmail;
//   authenticationOps.getUser(userEmail).then((result) => {
//     res.send(result);
//   });
// });

// //Gets User info by userID
// app.get("/userinfo", checkAuth, function (req, res) {
//   var userID = req.query.userID;
//   authenticationOps.getUserInfo(userID).then((result) => {
//     res.send(result);
//   });
// });

//Gets User info by userID
// app.get("/acceptpolicy", checkAuth, function (req, res) {
//   var userID = req.query.userID;
//    adminOps.acceptpolicy(userID).then((result) => {
//     res.send(result);
//   });
// });

// //Checks for duplicate email addresses before registration
// app.get("/dupcheck", function (req, res) {
//   var userEmail = req.query.userEmail;
//   authenticationOps.dupCheck(userEmail).then((result) => {
//     if (result === 1) {
//       res.send("duplicate");
//     } else {
//       res.send("address ok");
//     }
//   });
// });

//Checks for duplicate email addresses before registration
app.get("/invitationCheck", function (req, res) {
  var userEmail = req.query.userEmail;
  var invitationCode = req.query.invitationCode;
  authenticationOps.invitationCheck(userEmail, invitationCode).then((result) => {
    if (result === 1) {
      res.send("invalid");
    } else {
      res.send("address ok");
    }
  });
});

//Authenticates a user on attempted login
app.get("/auth", function (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;

  authenticationOps.login(userEmail).then((result) => {

    if (result === false) {
      res.send("false");
    } else {
      bcrypt.compare(
        userPassword,
        result.UserHash,
        function (err, resultCompare) {
          //       PASSWORD IS INVALID
          if (resultCompare === false || err ) {
            res.send("false");
          } else {
            //SET UP JWT TOKEN
              const token = jwt.sign(result, 
                process.env.JWT_KEY,
                {
                  expiresIn: "5m"
                })
              const reauthToken = jwt.sign(result, 
                process.env.JWT_REFRESH_KEY,
                {
                  expiresIn: "72h"
                })
            authenticationOps.getUser(userEmail, token).then((result) => {
              res.status(200).json({user: result, token: token, reauthToken: reauthToken});
            });
          }
        }
      );
    }
  });
});

//UPDATE PASSWORD

app.get("/updatePassword", checkAuth, function (req, res) {
  var userID = req.query.userID;
  var oldPassword = req.query.oldPassword;
  var newPassword = req.query.newPassword;

  authenticationOps.loginByID(userID).then((result) => {
    if (result === false) {
      res.send("false");
    } else {
      bcrypt.compare(
        oldPassword,
        result.UserHash,
        function (err, resultCompare) {
          //       PASSWORD IS INVALID
          if (resultCompare === false) {
            res.send("false");
          } else {
            //START THE HASHING AND THEN SEND TO UPDATE

            var saltRounds = 10;
            bcrypt.hash(newPassword, saltRounds, function (err, hash) {
              //  let value = hash; // hash to send
              //  Now add to the DB
              authenticationOps.updatePassword(userID, hash).then((result) => {
                const list = result;
                res.send(list);
              });
            });

            //END OF HASHING
          }
        }
      );
    }
  });
});

//Update User
app.get("/updateUser", checkAuth, async function (req, res) {
  var userID = req.query.userID;
  var userFirst = req.query.userFirst;
  var userLast = req.query.userLast;
  var userDisplayName = req.query.userDisplayName;
  await authenticationOps
    .updateUser(userID, userFirst, userLast, userDisplayName)
    .then((result) => {
      const list = result;
      res.send(list);
    });
});

//start forgot password
app.get("/forgot", async function (req, res) {
  var email = req.query.email;
  await authenticationOps.forgot(email)
    .then((result) => {
      const list = result;
      res.send(list);
    });
});

//Reset password check
app.get("/resetCheck", async function (req, res) {
  var email = req.query.email;
  var verifyCode = req.query.verifyCode;
  await authenticationOps.resetCheck(email, verifyCode)
    .then((result) => {
      const list = result;
      res.send(list);
    });
});

//RESET PASSWORD
app.get("/resetPassword", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

            //START THE HASHING AND THEN SEND TO UPDATE

            var saltRounds = 10;
            bcrypt.hash(password, saltRounds, function (err, hash) {
                let value = hash; // hash to send
              //  Now add to the DB
              authenticationOps.resetPassword(email, hash).then((result) => {
                const list = result;
                res.send(list);
              });
            });
          });
            //END OF HASHING

//Get Events
app.get('/getEvents', function (req, res) {
      events.getEvents()
      .then(result => {
       res.send(result) 
  })  
  });

//Get Attendees
app.get('/getAttendees', function (req, res) {
  var eventID = req.query.eventID;
      events.getAttendees(eventID)
      .then(result => {
       res.send(result) 
  })  
  });

    //Add Event
    app.get('/addEvent', function (req, res) {
      var eventTitle = req.query.eventTitle;
      var eventHostess = req.query.eventHostess;
      var eventLocation = req.query.eventLocation;
      var eventDate = req.query.eventDate;
      var eventTime = req.query.eventTime;
      var inviteBringing = req.query.inviteBringing;
      var eventDetails = req.query.eventDetails;
        events.addEvent(eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails)
        .then(result => {
         res.send(result) 
    })  
    });

  //Delete Event
  app.get('/deleteEvent', function (req, res) {
    var eventID = req.query.eventID;
      events.deleteEvent(eventID)
      .then(result => {
       res.send(result) 
  })  
  });

    //Get Event
    app.get('/getEvent', function (req, res) {
      var eventID = req.query.eventID;
        events.getEvent(eventID)
        .then(result => {
         res.send(result) 
    })  
    });

       //Get Event
       app.get('/getEventStatus', function (req, res) {
        var eventID = req.query.eventID;
        var userID = req.query.userID;
          events.getEventStatus(eventID, userID)
          .then(result => {
            res.send(result) 
      })  
      });
 
        //Accept RSVP
        app.get('/acceptRsvp', function (req, res) {
        var eventID = req.query.eventID;
        var userID = req.query.userID;
          events.acceptRsvp(eventID, userID)
          .then(result => {
            res.send(result) 
      })  
      });

        //Cancel RSVP
        app.get('/cancelRsvp', function (req, res) {
        var eventID = req.query.eventID;
        var userID = req.query.userID;
          events.cancelRsvp(eventID, userID)
          .then(result => {
            res.send(result) 
      })  
      });

//INVITATIONS

// //Get the info for an invitation that was sent via email
// app.get("/getInvitation", async function (req, res) {
//   var invitationID = req.query.invitationID;
//   invitations.getInvitation(invitationID).then((result) => {
//     const invitation = result[0];
//     res.send(invitation);
//   });
// });

// //User Accepts invitation to another user's primary/everyone circle
// app.get("/acceptinvitation",  async function (req, res) {
//   var circleMemID = req.query.circleMemID;
//   var userID = req.query.userID;
//   await invitations.acceptInvitation(circleMemID, userID).then((result) => {
//     const list = result;
//     res.send("acceptinvitation done");
//   });
// });

// //User declines invitation to another user's primary/everyone circle
// app.get("/declineinvitation", checkAuth, async function (req, res) {
//   var circleMemID = req.query.circleMemID;
//   var userID = req.query.userID;
//   await invitations.declineInvitation(circleMemID, userID).then((result) => {
//     const list = result;
//     res.send("declineinvitation done");
//   });
// });



// //Confirm Email Change
// app.get("/confirmEmail", function (req, res) {
//   var userID = req.query.userID;
//   var recno = req.query.recno;
//   profileOps.confirmNewEmail(userID, recno).then((result) => {
//     const confirmation = result;
//     res.send(confirmation);
//   });
// });


//Handle production
if(process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/public/'))

  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

var port = process.env.PORT || 8700;
app.listen(port);
console.log("ZeroZeroStart API is running at " + port);