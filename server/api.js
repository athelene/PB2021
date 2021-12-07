const authenticationOps = require('./authenticationOps');
const bcrypt = require('bcrypt');
var hourOps = require('./hourOps');
var games = require('./games');
var standingGames = require('./standingGames');
var groups = require('./groups');
var players = require('./players');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const { response } = require('express');
var app = express();



app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.use(cors());
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));

//app.use("/api", router);
app.use("/", router);

router.use((request,response,next) => {

    next();
})

app.get('/', function (req, res) {
  res.send('Hello Big Wide World!')
})

//AUTHENTICATION ROUTES

app.get('/api/login', function async (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
  console.log('about to start login (mylogin) in authenticationOps', 'userEmail: ', userEmail, 'userPassword: ', userPassword);
  authenticationOps.login(userEmail).then(result => {
  console.log('login route user result from azure is:', result);
  console.log('trying to get hash from result: ', result)

})
})

app.get('/api/register', function (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
  var userDisplayName = req.query.userDisplayName;
  var userFirst = req.query.userFirst;
  var userLast = req.query.userLast;
  var userPhoneAreaCode = req.query.userLast;
  var userPhonePrefix = req.query.userLast;
  var userPhoneLine = req.query.userLast;
  var saltRounds = 10;
  console.log('email ', userEmail, 'password ', userPassword, 'displayname: ', userDisplayName, 'first ', userFirst, 'last ', userLast);
  bcrypt.hash(userPassword, saltRounds, function(err, hash) {
  let value = hash; // hash to send
  console.log('hash is: ', hash)
  //  Now add to the DB
        authenticationOps.newUser(userEmail, userDisplayName, userFirst, userLast, userPhoneAreaCode, userPhonePrefix, userPhoneLine, hash).then(result => {
        const list = result;
        console.log('result is:', list);
       res.send(list) 
})  
  })
})
//WORKING 2021-03-34
app.get('/api/user', function (req, res) {
    var userEmail = req.query.userEmail;
    console.log('about to start getUser in dboperations')
    console.log('userEmail from url is: ', userEmail);
      authenticationOps.getUser(userEmail).then(result => {
        console.log('user result from azure is:', result);
       res.send(result) 
})  
})
//WORKING 2021-03-24
app.get('/api/dupcheck', function (req, res) {
    var userEmail = req.query.userEmail;
    console.log('about to start dupCheck in dboperations')
    console.log('userEmail from url is: ', userEmail);
      authenticationOps.dupCheck(userEmail).then(result => {
        console.log('user result from azure is:', result);
        if (result === 1) {
          res.send('duplicate') 
        } else {
          res.send('address ok');
        }
       
})  
})

app.get('/api/auth', function (req, res) {
    var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
    console.log('about to start login (mylogin) in dboperations', 'userEmail: ', userEmail, 'userPassword: ', userPassword);

     authenticationOps.login(userEmail).then(result => {
        console.log('login route user result from azure is:', result);
        if (result === 'Invalid Login') {
          console.log('should be end of api')
          res.send('Invalid Login')

        }
        console.log('trying to get hash from result: ', result)

        bcrypt.compare(userPassword, result.UserHash, function(err, resultCompare) {
        console.log('result from compare is: ', resultCompare) 

 //       PASSWORD IS INVALID
          if (resultCompare === false) {
          res.send('false') 
          } 
          else {
 //           PASSWORD IS VALID
          console.log('about to start getUser in dboperations')
          console.log('userEmail from url is: ', userEmail);
            authenticationOps.getUser(userEmail).then(result => {
              console.log('user result from azure is:', result);
            res.send(result) 
            } )
          }
          })
 
    })
})

//Set user's first available time
app.get('/api/setmytime', function (req, res) {
  var gameDate = req.query.gameDate;
  var selectedTime = req.query.selectedTime;
  var userID = req.query.userID;
  var ampm = req.query.ampm;
  console.log('gameDate, selectedTime, userID from url is: ',gameDate, selectedTime, userID, ampm);
    games.setMyTime(gameDate, selectedTime, userID, ampm).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Set user's first available time
app.get('/api/getmytime', function (req, res) {
  var gameDate = req.query.gameDate;
  var userID = req.query.userID;
  var ampm = req.query.ampm;
  console.log('gameDate, selectedTime, userID from url is: ', gameDate,  Number(userID), ampm);
    games.getMyTime(gameDate, Number(userID), ampm).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Set user's first available time
app.get('/api/getearliesttime', function (req, res) {
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  console.log('gameDate, ampm from url is: ', gameDate,  ampm);
    games.getEarliestTime(gameDate, ampm).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Set user's first available time
app.get('/api/getplayercount', function (req, res) {
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  console.log('gameDate, ampm from url is: ', gameDate,  ampm);
    games.getPlayerCount(gameDate, ampm).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Set user's first available time
app.get('/api/resigngame', function (req, res) {
  var userID = req.query.userID;
  var gameDate = req.query.gameDate;
  var ampm = req.query.ampm;
  console.log('gameDate, ampm from url is: ', gameDate,  ampm);
    games.resignGame(userID, gameDate, ampm).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})


// //GET game notes for given game
// app.get('/api/getGameNotes', function (req, res) {
//   console.log('about to getGameNotes')
//   var gameID = req.query.gameID;
//   console.log('api start, userid: ', gameID)
//     games.getGameNotes(gameID).then(result => {
//       console.log('getGameNotes result from azure is:', result);
//      res.send(result) 
// })  
// })

// //DELETE game notes for given game
// app.get('/api/deleteGameNote', function (req, res) {
//   console.log('about to deleteGameNote')
//   var gameNoteID = req.query.gameNoteID;
//   console.log('api start, userid: ', gameNoteID)
//     games.deleteGameNote(gameNoteID).then(result => {
//       console.log('deleteGameNote result from azure is:', result);
//      res.send(result) 
// })  
// })

// //ADD game notes for given game
// app.get('/api/addNote', function (req, res) {
//   console.log('about to getGameNotes')
//   var gameID = req.query.gameID;
//   var userID = req.query.userID;
//   var gameNote = req.query.gameNote;
//   console.log('api start, userid: ', gameID, userID, gameNote)
//     games.addNote(gameID, userID, gameNote).then(result => {
//       console.log('addNote result from azure is:', result);
//      res.send(result) 
// })  
// })



//Handle production
if(process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/public/'))

  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

var port = process.env.PORT || 8700;
app.listen(port);
console.log('PB API is running at ' + port);
