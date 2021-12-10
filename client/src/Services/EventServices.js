import axios from "axios"

import store from '../store'

  let servername = 'https://' + window.location.hostname;

    if (servername === 'https://localhost') {
      servername = 'http://localhost:8700';
}

export default {




  //SET FOR PRODUCTION OR DEVELOPMENT
//  getServerName() {
 //   return "http://localhost:8700"
//    return "https://zerozerostart.herokuapp.com/api" 
//    return process.env.VUE_APP_SERVERNAME
//  },

  //Authentication Stuff
  
  async getUser(userEmail) {
    let myroute = process.env.VUE_APP_SERVERNAME + '/user'
    console.log('getUser: about to make the call to api. email is: ', userEmail)
    const params = {
     userEmail: userEmail}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async login(userEmail, userPassword) {
    let myroute = servername +  '/auth'
    console.log('login (/auth route): about to make the call to api. email is: ', userEmail)
    const params = {
     userEmail: userEmail,
      userPassword: userPassword}
   let res = await axios.get(myroute, { params })
   console.log('ES login result is: ', res.data)
      return res.data
      },

  async registration(email, firstname, lastname, displayName, password) {
    let myroute = process.env.VUE_APP_SERVERNAME + '/dupCheck'
    console.log('register: about to make the call to api. email is: ', email, firstname, lastname, displayName, password);

    const params = {
      userFirst: firstname,
      userLast: lastname,
      userDisplayName: displayName,
      userEmail: email,
      userPassword: password}
    let check= await axios.get(myroute, { params });
    console.log('dup check result is: ', check.data);
      if (check.data === 'duplicate') {
        return check.data
      } else {
      let nextroute = servername + '/register' 
    let res = await axios.get(nextroute, { params });
    console.log('eventservice.registration res.data is: ', res.data);
    return res.data;}
  },

  // async getHourStatus(gameDate, gameCourt) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/hourStatus'
  //   console.log('hourStatus route: about to make the call to api. gameDate, gameCourt: ', gameDate, gameCourt)
  //   const params = {
  //    gameDate: gameDate,
  //     gameCourt: gameCourt}
  //  let res = await axios.get(myroute, { params })
  //  console.log('ES hourStatus result is: ', res.data)
  //     return res.data
  //     },

      async setMyTime(userID, selectedTime, gameDate, ampm) {
        let myroute = process.env.VUE_APP_SERVERNAME + '/setmytime'
        console.log('setmytime route: about to make the call to api. gameDate, gameCourt: ', gameDate, selectedTime, userID, ampm)
        const params = {
          gameDate: gameDate,
          selectedTime: selectedTime,
          userID: userID,
          ampm: ampm}
        let res = await axios.get(myroute, { params })
        console.log('ES completed saving myTime result is: ', res.data)
          return res.data
          },

    async getMyTime(userID, gameDate, ampm) {
      let myroute = process.env.VUE_APP_SERVERNAME + '/getmytime'
      console.log('getmytime route: about to make the call to api. gameDate, gameCourt: ', gameDate, userID, ampm)
      const params = {
        gameDate: gameDate,
        userID: userID,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
      console.log('ES getMyTime result is: ', gameDate, userID, ampm, res.data)
        return res.data
        },

    async getEarliestTime(gameDate, ampm) {
      let myroute = process.env.VUE_APP_SERVERNAME + '/getearliesttime'
      console.log('getearliesttime route: about to make the call to api. gameDate,ampm: ', gameDate, ampm)
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
      console.log('ES getEarliestTime result is: ', gameDate, ampm, res.data.recordsets[0])
        return res.data
        },

    async getPlayerCount(gameDate, ampm) {
      let myroute = process.env.VUE_APP_SERVERNAME + '/getplayercount'
      console.log('getplayercount route: about to make the call to api. gameDate,ampm: ', gameDate, ampm)
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
      console.log('ES getplayercount result is: ', res.data)
        return res.data
        },

    async resignMyGame(userID, gameDate, ampm) {
      let myroute = process.env.VUE_APP_SERVERNAME + '/resigngame'
      console.log('resigngame route: about to make the call to api. gameDate,ampm: ', userID, gameDate, ampm)
      const params = {
        userID: userID,
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
      console.log('ES resignMyGame result is: ', gameDate, ampm, res.data)
        return res.data
        },

        async weather() {
          console.log('starting weather in es')
           const params = {
             key: '9a9a5cdaf4164cb99de181002210712',
             q: '66061',
             days: 7,
             aqi: 'no', 
             alerts: 'no'
           }
       
          await axios.get('http://api.weatherapi.com/v1/forecast.json', {params})
          .then((weather) => {
            console.log('es weather is: ', weather);
            return weather
          })

         },

         async getPlayers() {
          let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayers'
          console.log('getPlayers route: about to make the call to api. ')
          let res = await axios.get(myroute)
          console.log('ES getPlayers result is: ', res.data)
            return res.data
            },
  // async getGameList(gameDate, gameCourt) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGameList'
  //   console.log('getGameList route: about to make the call to api. gameDate, gameCourt: ', gameDate, gameCourt)
  //   const params = {
  //     gameDate: gameDate,
  //     gameCourt: gameCourt}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES getGameList result is: ', res.data)
  //     return res.data
  //     },

  // async getFullGameList() {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getFullGameList'
  //   console.log('getFullGameList route: about to make the call to api. ')
  //   let res = await axios.get(myroute)
  //   console.log('ES getFullGameList result is: ', res.data)
  //     return res.data
  //     },

  // async getStandingGameList() {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getStandingGameList'
  //   console.log('getStandingGameList route: about to make the call to api. ')
  //   let res = await axios.get(myroute)
  //   console.log('ES getFullGameList result is: ', res.data)
  //     return res.data
  //     },

  // async deleteStandingGame(standingGameID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/deleteStandingGame'
  //   console.log('deleteStandingGame route: about to make the call to api. standingGameID: ', standingGameID)
  //   const params = {
  //     standingGameID: standingGameID}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES deleteStandingGame result is: ', res.data)
  //     return res.data
  //     },

  // async getCourts() {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getCourts'
  //   console.log('getCourts route: about to make the call to api. ')
  //   let res = await axios.get(myroute)
  //   console.log('ES getCourts result is: ', res.data)
  //     return res.data
  //     },

  // async getGroups(userID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGroups'
  //   console.log('getGroups route: about to make the call to api. ')
  //   const params = {
  //     userID: userID}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES getGroups result is: ', res.data)
  //     return res.data
  //     },

  //   async getGroup(groupID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getGroup'
  //     console.log('getGroup route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async addToGroup(groupID, userID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/addToGroup'
  //     console.log('getGroup route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID,
  //       userID: userID
  //     }
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async removeFromGroup(groupID, userID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/removeFromGroup'
  //     console.log('getGroup route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID,
  //       userID: userID
  //     }
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async getPlayerGroupStatus(groupID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayerGroupStatus'
  //     console.log('getPlayerGroupStatus route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async deleteGroup(groupID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/deleteGroup'
  //     console.log('deleteGroup route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES deleteGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async newGroup(groupName, groupTypeID, groupDescription) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/newGroup'
  //     console.log('newGroup route: about to make the call to api. ')
  //     const params = {
  //       groupName: groupName,
  //       groupTypeID: groupTypeID,
  //       groupDescription: groupDescription}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async editGroup(groupID, groupName, groupTypeID, groupDescription) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/editGroup'
  //     console.log('editGroup route: about to make the call to api. ')
  //     const params = {
  //       groupID: groupID,
  //       groupName: groupName,
  //       groupTypeID: groupTypeID,
  //       groupDescription: groupDescription}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async getAllGroups() {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getAllGroups'
  //     console.log('getGroups route: about to make the call to api. ')
  //     let res = await axios.get(myroute)
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },

  //   async getGroupTypes() {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getGroupTypes'
  //     console.log('getGroupTypes route: about to make the call to api. ')
  //     let res = await axios.get(myroute)
  //     console.log('ES getGroups result is: ', res.data)
  //       return res.data
  //       },


  //   async getHourList() {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getHourList'
  //     console.log('getHourList route: about to make the call to api. ')
  //     let res = await axios.get(myroute)
  //     console.log('ES getCourts result is: ', res.data)
  //       return res.data
  //       },
      
  // async getGameInfo(gameID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGameInfo'
  //   console.log('getGameinfo route: about to make the call to api. gameID: ', gameID)
  //   const params = {
  //     gameID: gameID}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES getGameList result is: ', res.data)
  //     return res.data
  //     },

  // async getStandingGameInfo(gameID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getStandingGameInfo'
  //   console.log('getStandingGameinfo route: about to make the call to api. gameID: ', gameID)
  //   const params = {
  //     gameID: gameID}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES getStandingGameList result is: ', res.data)
  //     return res.data
  //     },

  //   async saveGame(gameStart, gameEnd, groupID, selectedCourt) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/savegame'
  //     console.log('input to es is: ', gameStart, gameEnd, groupID, selectedCourt)

  //     const params = {
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID
  //       }
  
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES saveGame result is: ', res.data)
  //       return res.data
  //       },

  //   async saveStandingGame(gameStart, gameEnd, groupID, selectedCourt, weekday, userID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/savestandinggame'
  //     console.log('input to es is: ', gameStart, gameEnd, groupID, selectedCourt, weekday, userID)

  //     const params = {
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID,
  //       weekday: weekday,
  //       userID: userID
  //       }
  
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES saveGame result is: ', res.data)
  //       return res.data
  //       },

  //   async gameMessage(gameStart, gameEnd, groupID, selectedCourt, gameType) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/gamemessage'
  //     console.log('input to es is: ', gameStart, gameEnd, groupID, selectedCourt, gameType)

  //     const params = {
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID,
  //       gameType: gameType
  //       }
  
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES saveGame result is: ', res.data)
  //       return res.data
  //       },
    
  //   async edit1StandingGame(gameID, gameStart, gameEnd, groupID, selectedCourt, weekday, userID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/editStandingGame'
  //     console.log('userID from editstandinggame is: ', userID);
  //     console.log('input to es is: ', gameID, gameStart, gameEnd, groupID, selectedCourt, weekday, userID)

  //     const params = {
  //       gameID: gameID,
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID,
  //       weekday: weekday,
  //       userID: userID
  //       }
  
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES editGame result is: ', res.data)
  //       return res.data
  //       },

  //   async editGame(gameID, gameStart, gameEnd, groupID, selectedCourt, userID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/editgame'
  //     console.log('input to es is: ', gameID, gameStart, gameEnd, groupID, selectedCourt, userID)
  //     const params = {
  //       gameID: gameID,
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID,
  //       userID: userID
  //       }
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES saveGame result is: ', res.data)
  //       return res.data
  //       },

  //   async editStandingGame(standingGameID, gameStart, gameEnd, groupID, selectedCourt, weekday) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/editstandinggame'
  //     console.log('input to es is: ', standingGameID, gameStart, gameEnd, groupID, selectedCourt, weekday)
  //     const params = {
  //       standingGameID: standingGameID,
  //       gameStart: gameStart,
  //       gameEnd: gameEnd,
  //       selectedCourt: selectedCourt,
  //       groupID: groupID,
  //       weekday: weekday
  //       }
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES saveGame result is: ', res.data)
  //       return res.data
  //       },

  //     async deleteGame(gameID) {
  //       let myroute = process.env.VUE_APP_SERVERNAME + '/deletegame'
  //       console.log('input to es is: ', gameID)
  //       const params = {
  //         gameID: gameID
  //         }
  //       let res = await axios.get(myroute, { params })
  //       console.log('ES saveGame result is: ', res.data)
  //         return res.data
  //         },

  //   async getGamePlayers(gameID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getGamePlayers'
  //   console.log('getGamePlayers: about to make the call to api.  ', gameID)
  //   const params = {
  //    gameID: gameID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async getPlayerStatus(gameID, userID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayerStatus'
  //   console.log('getPlayerStatus: about to make the call to api.  ', gameID, userID)
  //   const params = {
  //    gameID: gameID,
  //    userID: userID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data.returnValue;
  // },

  // async changePlayerStatus(gameID, userID, playerStatus) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/changePlayerStatus'
  //   console.log('changePlayerStatus: about to make the call to api.  ', gameID, userID, playerStatus)
  //   const params = {
  //    gameID: gameID,
  //    userID: userID,
  //    playerStatus: playerStatus
  //   }
  //   let res = await axios.get(myroute, { params });
  //   return res.data.returnValue;
  // },

  // async getGameNotes(gameID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGameNotes'
  //   console.log('getGameNotes: about to make the call to api.  ', gameID)
  //   const params = {
  //    gameID: gameID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async addNote(gameID, userID, gameNote) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/addNote'
  //   console.log('getGameNotes: about to make the call to api.  ', gameID, userID, gameNote)
  //   const params = {
  //    gameID: gameID,
  //    userID: userID,
  //    gameNote: gameNote}
  //   let res = await axios.get(myroute, { params });
  //   return res.data.returnValue;
  // },

  // async deleteGameNote(gameNoteID) {
  //   var servername = await this.getServerName();
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/deleteGameNote'
  //   console.log('deleteGameNote: about to make the call to api.  ',gameNoteID)
  //   const params = {
  //    gameNoteID: gameNoteID,}
  //   let res = await axios.get(myroute, { params });
  //   return res.data.returnValue;
  // },

  // async getGroupPlayers(groupID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGroupPlayers'
  //   console.log('getGroupPlayers: about to make the call to api.  ', groupID)
  //   const params = {
  //    groupID: groupID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async getGroupStatus(groupID, userID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getGroupStatus'
  //   console.log('getGroupStatus: about to make the call to api.  ', groupID, userID)
  //   const params = {
  //    groupID: groupID, 
  //    userID: userID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async getPlayerGroups(userID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayerGroups'
  //   console.log('getPlayerGroups: about to make the call to api.  ', userID)
  //   const params = {
  //    userID: userID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async changeGroupStatus(groupID, userID, status) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/changeGroupStatus'
  //   console.log('changeGroupStatus: about to make the call to api.  ', groupID, userID, status)
  //   const params = {
  //    groupID: groupID, 
  //    userID: userID, 
  //    status: status}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },



  // async getPlayerGroupsbyPlayer(userID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayerGroupsbyPlayer'
  //   console.log('getPlayerGroupsbyPlayer: about to make the call to api.  ', userID)
  //   const params = {
  //     userID: userID}
  //   let res = await axios.get(myroute, { params });
  //   return res.data;
  // },

  // async deletePlayer(playerID) {
  //   let myroute = process.env.VUE_APP_SERVERNAME + '/deletePlayer'
  //   console.log('deletePlayer route: about to make the call to api. standingGameID: ', playerID)
  //   const params = {
  //     playerID: playerID}
  //   let res = await axios.get(myroute, { params })
  //   console.log('ES deletePlayer result is: ', res.data)
  //     return res.data
  //     },

  //   async getPlayer(playerID) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/getPlayer'
  //     console.log('getPlayer route: about to make the call to api. playerID: ', playerID)
  //     const params = {
  //       playerID: playerID}
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES getPlayer result is: ', res.data)
  //       return res.data
  //       },


  //   async editPlayer(playerID, firstName, lastName, displayName, email) {
  //     let myroute = process.env.VUE_APP_SERVERNAME + '/editPlayer'
  //     console.log('editPlayer route: about to make the call to api. playerID: ', playerID)
  //     const params = {
  //       playerID: playerID,
  //       firstName: firstName,
  //       lastName: lastName,
  //       displayName: displayName,
  //       email: email }
  //     let res = await axios.get(myroute, { params })
  //     console.log('ES editPlayer result is: ', res.data)
  //       return res.data
  //       },

   }