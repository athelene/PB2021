const authenticationOps = require('./authenticationOps');
const bcrypt = require('bcrypt');
var hourOps = require('./hourOps');
var games = require('./games');
var standingGames = require('./standingGames');
var groups = require('./groups');

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
    console.log('middleware up');
    next();
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//AUTHENTICATION ROUTES

app.get('/login', function async (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
  console.log('about to start login (mylogin) in authenticationOps', 'userEmail: ', userEmail, 'userPassword: ', userPassword);
  authenticationOps.login(userEmail).then(result => {
  console.log('login route user result from azure is:', result);
  console.log('trying to get hash from result: ', result)

})
})

app.get('/register', function (req, res) {
  var userEmail = req.query.userEmail;
  var userPassword = req.query.userPassword;
  var userDisplayName = req.query.userDisplayName;
  var userFirst = req.query.userFirst;
  var userLast = req.query.userLast;
  var saltRounds = 10;
  console.log('email ', userEmail, 'password ', userPassword, 'displayname: ', userDisplayName, 'first ', userFirst, 'last ', userLast);
  bcrypt.hash(userPassword, saltRounds, function(err, hash) {
  let value = hash; // hash to send
  console.log('hash is: ', hash)
  //  Now add to the DB
        authenticationOps.newUser(userEmail, userDisplayName, userFirst, userLast, hash).then(result => {
        const list = result;
        console.log('result is:', list);
       res.send(list) 
})  
  })
})
//WORKING 2021-03-34
app.get('/user', function (req, res) {
    var userEmail = req.query.userEmail;
    console.log('about to start getUser in dboperations')
    console.log('userEmail from url is: ', userEmail);
      authenticationOps.getUser(userEmail).then(result => {
        console.log('user result from azure is:', result);
       res.send(result) 
})  
})
//WORKING 2021-03-24
app.get('/dupcheck', function (req, res) {
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

app.get('/auth', function (req, res) {
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

//GET HOURS AVAILABLE FOR COURT ON GIVEN DATE
app.get('/hourStatus', function (req, res) {
  var gameDate = req.query.gameDate;
  var gameCourt = req.query.gameCourt;
  console.log('about to start hourStatus')
  console.log('gameDate, court from url is: ',gameDate, gameCourt);
    hourOps.getHourStatus(gameDate, gameCourt).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET LIST OF HOURS
app.get('/getHourList', function (req, res) {
  console.log('about to getHourList')
    hourOps.getHourList().then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET GROUPS for this user
app.get('/getGroups', function (req, res) {
  var userID = req.query.userID;
  console.log('about to start getGroups')
    groups.getGroups(userID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET GROUPS for this user
app.get('/deleteGroup', function (req, res) {
  var groupID = req.query.groupID;
  console.log('about to start deleteGroups')
    groups.deleteGroup(groupID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET ALL GROUPS for Group Page
app.get('/newGroup', function (req, res) {
  var groupName = req.query.groupName;
  var groupTypeID = req.query.groupTypeID;
  var groupDescription = req.query.groupDescription;
  console.log('about to start newGroup, groupDescription is: ', groupDescription)
    groups.newGroup(groupName, groupTypeID, groupDescription).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET ALL GROUPS for Group Page
app.get('/editGroup', function (req, res) {
  var groupID = req.query.groupID;
  var groupName = req.query.groupName;
  var groupTypeID = req.query.groupTypeID;
  var groupDescription = req.query.groupDescription;
    groups.editGroup(groupID, groupName, groupTypeID, groupDescription).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET GROUP for editing
app.get('/getGroup', function (req, res) {
  var groupID = req.query.groupID;
  console.log('about to start getGroup')
    groups.getGroup(groupID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET Player GROUP Status for editing list of players
app.get('/getPlayerGroupStatus', function (req, res) {
  var groupID = req.query.groupID;
  console.log('about to start getPlayerGroupStatus')
    groups.getPlayerGroupStatus(groupID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Add Player to GROUP
app.get('/addToGroup', function (req, res) {
  var groupID = req.query.groupID;
  var userID = req.query.userID;
  console.log('about to start addToGroup')
    groups.addToGroup(groupID, userID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//Remove Player from GROUP
app.get('/removeFromGroup', function (req, res) {
  var groupID = req.query.groupID;
  var userID = req.query.userID;
  console.log('about to start removeFromGroup')
    groups.removeFromGroup(groupID, userID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET ALL GROUP Types for Group Page
app.get('/getGroupTypes', function (req, res) {
  console.log('about to start getGroupTypes')
    groups.getGroupTypes().then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET ALL GROUPS for Group Page
app.get('/getAllGroups', function (req, res) {
  var userID = req.query.userID;
  console.log('about to start getAllGroups')
    groups.getAllGroups(userID).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET LIST OF COURTS
app.get('/getCourts', function (req, res) {
  console.log('about to getCourts')
    hourOps.getCourts().then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET LIST OF GAMES
app.get('/getGameList', function (req, res) {
  console.log('about to getGameList')
  var gameDate = req.query.gameDate;
  var gameCourt = req.query.gameCourt;
  console.log('gameDate, gameCourt is: ', gameDate, gameCourt);

    games.getGameList(gameDate, gameCourt).then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET FULL LIST OF GAMES
app.get('/getFullGameList', function (req, res) {
  console.log('about to getFullGameList')

    games.getFullGameList().then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//GET LIST OF Players
app.get('/getGamePlayers', function (req, res) {
  console.log('about to getGamePlayers')
  var gameID = req.query.gameID;
    games.getGamePlayers(gameID).then(result => {
      console.log('gamePlayers result from azure is:', result);
     res.send(result) 
})  
})

//GET PlayerStatus for given game
app.get('/getPlayerStatus', function (req, res) {
  console.log('about to getPlayerStatus')
  var gameID = req.query.gameID;
  var userID = req.query.userID;
  console.log('api start, userid: ', userID)
    games.getPlayerStatus(gameID, userID).then(result => {
      console.log('getPlayerStatus result from azure is:', result);
     res.send(result) 
})  
})

//Change PlayerStatus for given game
app.get('/changePlayerStatus', function (req, res) {
  console.log('about to getPlayerStatus')
  var gameID = req.query.gameID;
  var userID = req.query.userID;
  var playerStatus = req.query.playerStatus;
    games.changePlayerStatus(gameID, userID, playerStatus).then(result => {
      console.log('changePlayerStatus result from azure is:', result);
     res.send(result) 
})  
})

//GET game notes for given game
app.get('/getGameNotes', function (req, res) {
  console.log('about to getGameNotes')
  var gameID = req.query.gameID;
  console.log('api start, userid: ', gameID)
    games.getGameNotes(gameID).then(result => {
      console.log('getGameNotes result from azure is:', result);
     res.send(result) 
})  
})

//DELETE game notes for given game
app.get('/deleteGameNote', function (req, res) {
  console.log('about to deleteGameNote')
  var gameNoteID = req.query.gameNoteID;
  console.log('api start, userid: ', gameNoteID)
    games.deleteGameNote(gameNoteID).then(result => {
      console.log('deleteGameNote result from azure is:', result);
     res.send(result) 
})  
})

//ADD game notes for given game
app.get('/addNote', function (req, res) {
  console.log('about to getGameNotes')
  var gameID = req.query.gameID;
  var userID = req.query.userID;
  var gameNote = req.query.gameNote;
  console.log('api start, userid: ', gameID, userID, gameNote)
    games.addNote(gameID, userID, gameNote).then(result => {
      console.log('addNote result from azure is:', result);
     res.send(result) 
})  
})

//SAVE SINGLE GAME
app.get('/savegame', function (req, res) {
  console.log('api is getting: ', req.query)
  var gameStart = req.query.gameStart;
  var gameEnd = req.query.gameEnd;
  var gameGroup = req.query.groupID;
  var selectedCourt = req.query.selectedCourt;

  console.log('about to start saveGame: ', gameStart, gameEnd, gameGroup, selectedCourt)
   games.saveGame(gameStart, gameEnd, gameGroup, selectedCourt).then(result => {
      console.log('newGame result from azure is:', result);
     res.send(result) 
})  
})

//Edit SINGLE GAME
app.get('/editgame', function (req, res) {
  console.log('api is getting: ', req.query)
  var gameID = req.query.gameID;
  var gameStart = req.query.gameStart;
  var gameEnd = req.query.gameEnd;
  var gameGroup = req.query.groupID;
  var selectedCourt = req.query.selectedCourt;
  var userID = req.query.userID;

  console.log('about to start saveGame: ', gameID, gameStart, gameEnd, gameGroup, selectedCourt, userID)
   games.editGame(gameID, gameStart, gameEnd, gameGroup, selectedCourt, userID).then(result => {
      console.log('editGame result from azure is:', result);
     res.send(result) 
})  
})

//GET LIST OF Standing GAMES
app.get('/getStandingGameList', function (req, res) {
  console.log('about to getStandingGameList')

    standingGames.getStandingGameList().then(result => {
      console.log('user result from azure is:', result);
     res.send(result) 
})  
})

//SAVE STANDING GAME
app.get('/savestandinggame', function (req, res) {
  console.log('api is getting: ', req.query)
  var gameStart = req.query.gameStart;
  var gameEnd = req.query.gameEnd;
  var gameGroup = req.query.groupID;
  var selectedCourt = req.query.selectedCourt;
  var weekday = req.query.weekday;
  var userID = req.query.userID;

  console.log('about to start editStandingGame: ', gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID)
   standingGames.saveStandingGame(gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID).then(result => {
      console.log('saveStandingGame result from azure is:', result);
     res.send(result) 
})  
})

//DELETE Standing game 
app.get('/deleteStandingGame', function (req, res) {
  console.log('about to deleteGame')
  var standingGameID = req.query.standingGameID;
  console.log('api start, standingGameid: ', standingGameID)
    standingGames.deleteStandingGame(standingGameID).then(result => {
      console.log('deleteGameNote result from azure is:', result);
     res.send(result) 
})  
})

//Edit Standing GAME
app.get('/editStandingGame', function (req, res) {
  console.log('api is getting: ', req.query)
  var gameID = req.query.gameID;
  var gameStart = req.query.gameStart;
  var gameEnd = req.query.gameEnd;
  var gameGroup = req.query.groupID;
  var selectedCourt = req.query.selectedCourt;
  var weekday = req.query.weekday;
  var userID = req.query.userID;

  console.log('about to start editStandingGame: ', gameID, gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID)
   standingGames.editStandingGame(gameID, gameStart, gameEnd, gameGroup, selectedCourt, weekday, userID).then(result => {
      console.log('editStandingGame result from azure is:', result);
     res.send(result) 
})  
})

//DELETE game 
app.get('/deleteGame', function (req, res) {
  console.log('about to deleteGame')
  var gameID = req.query.gameID;
  console.log('api start, gameid: ', gameID)
    games.deleteGame(gameID).then(result => {
      console.log('deleteGameNote result from azure is:', result);
     res.send(result) 
})  
})

//get game info for editing
app.get('/getGameInfo', function (req, res) {
  console.log('about to getGameInfo')
  var gameID = req.query.gameID;
  console.log('api start, gameid: ', gameID)
    games.getGameInfo(gameID).then(result => {
      console.log('getGameInfo result from azure is:', result);
     res.send(result) 
})  
})

//get standing game info for editing
app.get('/getStandingGameInfo', function (req, res) {
  console.log('about to getStandingGameInfo')
  var gameID = req.query.gameID;
  console.log('api start, gameid: ', gameID)
    standingGames.getStandingGameInfo(gameID).then(result => {
      console.log('getGameInfo result from azure is:', result);
     res.send(result) 
})  
})

//SAVE SINGLE GAME
app.get('/gamemessage', function (req, res) {
  console.log('api is getting: ', req.query)
  var gameStart = req.query.gameStart;
  var gameEnd = req.query.gameEnd;
  var gameGroup = req.query.groupID;
  var selectedCourt = req.query.selectedCourt;
  var gameType = req.query.gameType;

  console.log('about to start saveGame: ', gameStart, gameEnd, gameGroup, selectedCourt, gameType)
    if(gameType === 'newstanding'){
   messages.newStandingGame(gameStart, gameEnd, gameGroup, selectedCourt).then(result => {
      console.log('messages.newStandingGame result from azure is:', result);
     res.send(result) 
      })  }

      
    if(gameType === 'editstanding'){
      messages.editStandingGame(gameStart, gameEnd, gameGroup, selectedCourt).then(result => {
          console.log('messages.editStandingGame result from azure is:', result);
        res.send(result) 
          })  }

    if(gameType === 'newsingle'){
      messages.newSingleGame(gameStart, gameEnd, gameGroup, selectedCourt).then(result => {
          console.log('messages.newSingleGame result from azure is:', result);
        res.send(result) 
          })  }

    if(gameType === 'editsingle'){
      messages.editSingleGame(gameStart, gameEnd, gameGroup, selectedCourt).then(result => {
          console.log('messages.editSingleGame result from azure is:', result);
        res.send(result) 
          })  }
})

//GET LIST OF Players in a Group
app.get('/getGroupPlayers', function (req, res) {
  console.log('about to getGroupPlayers')
  var groupID = req.query.groupID;
    groups.getGroupPlayers(groupID).then(result => {
      console.log('groupPlayers result from azure is:', result);
     res.send(result) 
})  
})

//GET Players status in a Group
app.get('/getGroupStatus', function (req, res) {
  console.log('about to getGroupStatus')
  var groupID = req.query.groupID;
  var userID = req.query.userID;
    groups.getGroupStatus(groupID, userID).then(result => {
      console.log('groupStatus result from azure is:', result);
     res.send(result) 
})  
})

//GET Players status in a Group
app.get('/changeGroupStatus', function (req, res) {
  console.log('about to changeGroupStatus')
  var groupID = req.query.groupID;
  var userID = req.query.userID;
  var status = req.query.status; 
  console.log('status is: ', status)
  if(status === 'false') {
    groups.addToGroup(groupID, userID).then(result => {
      console.log('addToGroup result from azure is:', result);
     res.send(result) 
})  
  } else {
    groups.removeFromGroup(groupID, userID).then(result => {
      console.log('removeFromGroup result from azure is:', result);
     res.send(result) 
})  
  }
})

//GET Players groups
app.get('/getPlayerGroups', function (req, res) {
  console.log('about to getPlayerGroups')
  var userID = req.query.userID;
    groups.getPlayerGroups(userID).then(result => {
      console.log('playerGroups result from azure is:', result);
     res.send(result) 
})  
})

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
