require("dotenv").config();
const authenticationOps = require("./authenticationOps");
const games = require("./games");
const players = require("./players");
const bcrypt = require("bcrypt");
const fs = require("fs");
 const jwt = require('jsonwebtoken');
 const checkAuth = require('./check-auth.js');
var express = require("express");
const { response } = require("express");
var app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// if(process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https')
//       res.redirect(`https://${req.header('host')}${req.url}`)
//     else
//       next()
//   })
// }


// app.use((req, res, next) => {
// //    res.header("Access-Control-Allow-Origin", "https://zerozerostart.herokuapp.com")
// if(process.env.NODE_ENV !== 'production') {
//   res.header("Access-Control-Allow-Origin", "*");
//   }
//    if(process.env.NODE_ENV === 'production') {
//    res.header("Access-Control-Allow-Origin", "https://zerozerostart.herokuapp.com")
//    }

//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });


// var router = express.Router();
// //app.use("/api", router);
// app.use("/", router);

// router.use((request, response, next) => {

//   next();
// });


// //PB APIs
// //Set user's first available time
// app.get('/api/setmytime', function (req, res) {
//     var gameDate = req.query.gameDate;
//     var selectedTime = req.query.selectedTime;
//     var userID = req.query.userID;
//     var ampm = req.query.ampm;
//     var locationPref = req.query.locationPref;
//     var myReservation = req.query.myReservation;
//     console.log('gameDate, selectedTime, userID from url is: ',gameDate, selectedTime, userID, ampm, locationPref, myReservation);
//       games.setMyTime(gameDate, selectedTime, userID, ampm, locationPref, myReservation).then(result => {
//         console.log('user result from azure is:', result);
//        res.send(result) 
//   })  
//   });
  
//   //Set user's first available time
//   app.get('/api/getmytime', function (req, res) {
//     var gameDate = req.query.gameDate;
//     var userID = req.query.userID;
//     var ampm = req.query.ampm;
//     console.log('gameDate, selectedTime, userID from url is: ', gameDate,  Number(userID), ampm);
//       games.getMyTime(gameDate, Number(userID), ampm).then(result => {
//         console.log('user result from azure is:', result);
//        res.send(result) 
//   })  
//   });
  
//   //Set user's first available time
//   app.get('/api/getearliesttime', function (req, res) {
//     var gameDate = req.query.gameDate;
//     var ampm = req.query.ampm;
//     console.log('gameDate, ampm from url is: ', gameDate,  ampm);
//       games.getEarliestTime(gameDate, ampm).then(result => {
//         console.log('user result from azure is:', result);
//        res.send(result) 
//   })  
//   });
  
//   //Set user's first available time
//   app.get('/api/getplayercount', function (req, res) {
//     var gameDate = req.query.gameDate;
//     var ampm = req.query.ampm;
//     console.log('gameDate, ampm from url is: ', gameDate,  ampm);
//       games.getPlayerCount(gameDate, ampm).then(result => {
//         console.log('user result from azure is:', result);
//        res.send(result) 
//   })  
//   });
  
//    //Set user's first available time
//   app.get('/api/resigngame', function (req, res) {
//     var userID = req.query.userID;
//     var gameDate = req.query.gameDate;
//     var ampm = req.query.ampm;
//     console.log('gameDate, ampm from url is: ', gameDate,  ampm);
//       games.resignGame(userID, gameDate, ampm).then(result => {
//         console.log('user result from azure is:', result);
//        res.send(result) 
//   })  
//   });

//     //Add Note
// app.get('/api/getNotes', function (req, res) {
//   var gameDate = req.query.gameDate;
//   var ampm = req.query.ampm;
//   console.log('about to getNotes', gameDate, ampm)
//     games.getNotes(gameDate, ampm)
//     .then(result => {
//       console.log('player result from azure is:', result);
//      res.send(result) 
// })  
// });
//   //Add Note
// app.get('/api/addNote', function (req, res) {
//   var userID = req.query.userID;
//   var gameDate = req.query.gameDate;
//   var ampm = req.query.ampm;
//   var noteText = req.query.noteText;
//   console.log('about to addNote', userID, gameDate, ampm, noteText)
//     games.addNote(userID, gameDate, ampm, noteText)
//     .then(result => {
//       console.log('player result from azure is:', result);
//      res.send(result) 
// })  
// });

// //GET Players
// app.get('/api/getPlayers', function (req, res) {
//   console.log('about to getPlayers')
//     players.getPlayers().then(result => {
//       console.log('players result from azure is:', result);
//      res.send(result) 
// })  
// });

// //GET Player for edit
// app.get('/api/getPlayer', function (req, res) {
//   var playerID = req.query.playerID;
//   console.log('about to getPlayer for edit', )
//     players.getPlayer(playerID).then(result => {
//       console.log('player result from azure is:', result);
//      res.send(result) 
// })  
// });

// //GET Player for edit
// app.get('/api/editPlayer', function (req, res) {
//   var playerID = req.query.playerID;
//   var firstName = req.query.firstName;
//   var lastName = req.query.lastName;
//   var displayName = req.query.displayName;
//   var email = req.query.email;
//   var areaCode = req.query.areaCode;
//   var prefixCode = req.query.prefixCode;
//   var phoneLine = req.query.phoneLine;
//   console.log('about to editPlayer', playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine)
//     players.editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine)
//     .then(result => {
//       console.log('player result from azure is:', result);
//      res.send(result) 
// })  
// });

// //AUTHENTICATION ROUTES

// //Invite a new player

// app.get('/invitePlayer', function (req, res) {
//   console.log('about to invite a player from api')
//   var invitePlayerEmail = req.query.invitePlayerEmail;
//   console.log('api says incoming invitePlayerEmail is: ', invitePlayerEmail)
//   var userID = req.query.userID;
//   authenticationOps.dupCheck(invitePlayerEmail).then((result) => {
//     if (result === 1) {
//       res.send("duplicate");
//     } else {
//       authenticationOps.invitePlayer(invitePlayerEmail, userID)
//     .then(result => {
//       console.log('invitePlayer result from azure is:', result);
//      res.send()
//     })
//   }
//   })
// })


//  //registers a new user
// app.get("/register", function (req, res) {
//   var userEmail = req.query.userEmail;
//   var userPassword = req.query.userPassword;
//   var userDisplayName = req.query.userDisplayName;
//   var userFirst = req.query.userFirst;
//   var userLast = req.query.userLast;
//   var userAreaCode = req.query.userAreaCode;
//   var userPrefixCode = req.query.userPrefixCode;
//   var userPhoneLine = req.query.userPhoneLine;
//   var saltRounds = 10;
//   var randomVerify = Math.floor(Math.random() * 100000);
//   //randomVerify = userPassword.substring(1, 1) + randomVerify;
//   bcrypt.hash(userPassword, saltRounds, function (err, hash) {

//     authenticationOps
//       .newUser(userEmail, userDisplayName, userFirst, userLast, userAreaCode, userPrefixCode, userPhoneLine, hash)
//       .then((result) => {
//         const list = result;
//         res.send(list);
//       });
//   });
// });


// //User verifies signup
// // app.get("/verify", function (req, res) {
// //   var userID = decodeURI(req.query.userID);
// //   var verifyCode = req.query.verifyCode;
// //   authenticationOps.verify(verifyCode, userID).then((result) => {

// //     if (process.env.SERVER_STATUS === "Dev") {
// //       res.redirect(302, "http://localhost:8080/login");
// //     } else {
// //       res.redirect(302, "https://login.memoriesforus.com");
// //     }
// //   });
// // });

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

// //Gets User info by userID
// // app.get("/acceptpolicy", checkAuth, function (req, res) {
// //   var userID = req.query.userID;
// //    adminOps.acceptpolicy(userID).then((result) => {
// //     res.send(result);
// //   });
// // });

// // //Checks for duplicate email addresses before registration
// // app.get("/dupcheck", function (req, res) {
// //   var userEmail = req.query.userEmail;
// //   authenticationOps.dupCheck(userEmail).then((result) => {
// //     if (result === 1) {
// //       res.send("duplicate");
// //     } else {
// //       res.send("address ok");
// //     }
// //   });
// // });

// //Checks for duplicate email addresses before registration
// app.get("/invitationCheck", function (req, res) {
//   var userEmail = req.query.userEmail;
//   var invitationCode = req.query.invitationCode;
//   console.log('userEmail, invitationCode in invitatioCheck: ', userEmail, invitationCode)
//   authenticationOps.invitationCheck(userEmail, invitationCode).then((result) => {
//     if (result === 1) {
//       res.send("invalid");
//     } else {
//       res.send("address ok");
//     }
//   });
// });

// //Authenticates a user on attempted login
// app.get("/auth", function (req, res) {
//   var userEmail = req.query.userEmail;
//   var userPassword = req.query.userPassword;

//   authenticationOps.login(userEmail).then((result) => {

//     if (result === false) {
//       res.send("false");
//     } else {
//       bcrypt.compare(
//         userPassword,
//         result.UserHash,
//         function (err, resultCompare) {
//           //       PASSWORD IS INVALID
//           if (resultCompare === false || err ) {
//             res.send("false");
//           } else {
//             //SET UP JWT TOKEN
//               const token = jwt.sign(result, 
//                 process.env.JWT_KEY,
//                 {
//                   expiresIn: "5m"
//                 })
//               const reauthToken = jwt.sign(result, 
//                 process.env.JWT_REFRESH_KEY,
//                 {
//                   expiresIn: "72h"
//                 })
//             authenticationOps.getUser(userEmail, token).then((result) => {
//               res.status(200).json({user: result, token: token, reauthToken: reauthToken});
//             });
//           }
//         }
//       );
//     }
//   });
// });

// //UPDATE PASSWORD

// app.get("/updatePassword", checkAuth, function (req, res) {
//   var userID = req.query.userID;
//   var oldPassword = req.query.oldPassword;
//   var newPassword = req.query.newPassword;

//   authenticationOps.loginByID(userID).then((result) => {
//     if (result === false) {
//       res.send("false");
//     } else {
//       bcrypt.compare(
//         oldPassword,
//         result.UserHash,
//         function (err, resultCompare) {
//           //       PASSWORD IS INVALID
//           if (resultCompare === false) {
//             res.send("false");
//           } else {
//             //START THE HASHING AND THEN SEND TO UPDATE

//             var saltRounds = 10;
//             bcrypt.hash(newPassword, saltRounds, function (err, hash) {
//               //  let value = hash; // hash to send
//               //  Now add to the DB
//               authenticationOps.updatePassword(userID, hash).then((result) => {
//                 const list = result;
//                 res.send(list);
//               });
//             });

//             //END OF HASHING
//           }
//         }
//       );
//     }
//   });
// });

// //Update User
// app.get("/updateUser", checkAuth, async function (req, res) {
//   var userID = req.query.userID;
//   var userFirst = req.query.userFirst;
//   var userLast = req.query.userLast;
//   var userDisplayName = req.query.userDisplayName;
//   await authenticationOps
//     .updateUser(userID, userFirst, userLast, userDisplayName)
//     .then((result) => {
//       const list = result;
//       res.send(list);
//     });
// });

// //start forgot password
// app.get("/forgot", async function (req, res) {
//   var email = req.query.email;
//   await authenticationOps.forgot(email)
//     .then((result) => {
//       const list = result;
//       res.send(list);
//     });
// });

// //Reset password check
// app.get("/resetCheck", async function (req, res) {
//   var email = req.query.email;
//   var verifyCode = req.query.verifyCode;
//   await authenticationOps.resetCheck(email, verifyCode)
//     .then((result) => {
//       const list = result;
//       res.send(list);
//     });
// });

// //RESET PASSWORD
// app.get("/resetPassword", function (req, res) {
//   var email = req.query.email;
//   var password = req.query.password;

//             //START THE HASHING AND THEN SEND TO UPDATE

//             var saltRounds = 10;
//             bcrypt.hash(password, saltRounds, function (err, hash) {
//                 let value = hash; // hash to send
//               //  Now add to the DB
//               authenticationOps.resetPassword(email, hash).then((result) => {
//                 const list = result;
//                 res.send(list);
//               });
//             });
//           });
//             //END OF HASHING





// //INVITATIONS

// // //Get the info for an invitation that was sent via email
// // app.get("/getInvitation", async function (req, res) {
// //   var invitationID = req.query.invitationID;
// //   invitations.getInvitation(invitationID).then((result) => {
// //     const invitation = result[0];
// //     res.send(invitation);
// //   });
// // });

// // //User Accepts invitation to another user's primary/everyone circle
// // app.get("/acceptinvitation",  async function (req, res) {
// //   var circleMemID = req.query.circleMemID;
// //   var userID = req.query.userID;
// //   await invitations.acceptInvitation(circleMemID, userID).then((result) => {
// //     const list = result;
// //     res.send("acceptinvitation done");
// //   });
// // });

// // //User declines invitation to another user's primary/everyone circle
// // app.get("/declineinvitation", checkAuth, async function (req, res) {
// //   var circleMemID = req.query.circleMemID;
// //   var userID = req.query.userID;
// //   await invitations.declineInvitation(circleMemID, userID).then((result) => {
// //     const list = result;
// //     res.send("declineinvitation done");
// //   });
// // });



// // //Confirm Email Change
// // app.get("/confirmEmail", function (req, res) {
// //   var userID = req.query.userID;
// //   var recno = req.query.recno;
// //   profileOps.confirmNewEmail(userID, recno).then((result) => {
// //     const confirmation = result;
// //     res.send(confirmation);
// //   });
// // });


// //Handle production
// if(process.env.NODE_ENV === 'production') {
//   //static folder
//   app.use(express.static(__dirname + '/public/'))

//   //handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

var port = process.env.PORT || 8700;
app.listen(port);
console.log("ZeroZeroStart API is running at " + port);