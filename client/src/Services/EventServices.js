import axios from "axios"

  let servername = 'https://' + window.location.hostname;

    if (servername === 'https://localhost') {
      servername = 'http://localhost:8700';
}

export default {


  //Authentication Stuff
  
  async getUser(userEmail) {
    let myroute = servername + '/user'
//    console.log('getUser: about to make the call to api. email is: ', userEmail)
    const params = {
     userEmail: userEmail}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async login(userEmail, userPassword) {
    let myroute = servername +  '/auth'
 //   console.log('login (/auth route): about to make the call to api. email is: ', userEmail)
    const params = {
     userEmail: userEmail,
      userPassword: userPassword}
   let res = await axios.get(myroute, { params })
//   console.log('ES login result is: ', res.data)
      return res.data
      },

  async getMessages() {
        let myroute = servername + '/getMessages'
//        console.log('getMessages: about to make the call to api.  ')
        let res = await axios.get(myroute);
        return res.data;
      },

  async sendMessage(userID, messageText) {
    let myroute = servername + '/addMessage'
//    console.log('sendMessage: about to make the call to api.  ', userID, messageText)
    const params = {
      userID: userID,
      messageText: messageText}
    let res = await axios.get(myroute, { params });
    return res.data.returnValue;
  },

  async invitePlayer(invitePlayerEmail, userID) {
    let myroute = servername +  '/invitePlayer'
//    console.log('invitePlayer: about to make the call to api. email is: ', invitePlayerEmail, userID)
    const params = {
      invitePlayerEmail: invitePlayerEmail,
      userID: userID}
    let res = await axios.get(myroute, { params })
 //   console.log('ES invitePlayer result is: ', res.data)
      return res.data
      },      

  async registration(email, firstname, lastname, displayName, password, areaCode, prefixCode, phoneLine, invitationCode) {
    let myroute = servername + '/invitationCheck'
 //   console.log('register: about to make the call to api. email is: ', email, firstname, lastname, displayName, password, areaCode, prefixCode, phoneLine, invitationCode);
    let params = {
      userEmail: email,
      invitationCode: invitationCode}
    let check= await axios.get(myroute, { params });
 //   console.log('invitationcheck result is: ', check.data);
      if (check.data === 'invalid') {
        return check.data
      } else {
 //       console.log('email and invitationCode agree');
        let params = {
          userFirst: firstname,
          userLast: lastname,
          userDisplayName: displayName,
          userEmail: email,
          userPassword: password,
          userAreaCode: areaCode,
          userPrefixCode: prefixCode,
          userPhoneLine: phoneLine}
      let nextroute = servername + '/register' 
    let res = await axios.get(nextroute, { params });
 //   console.log('eventservice.registration res.data is: ', res.data);
    return res.data;}
  },


      async setMyTime(userID, selectedTime, gameDate, ampm, locationPref, myReservation, guestCount) {
        let myroute = servername + '/setmytime'
 //       console.log('setmytime route: about to make the call to api. gameDate, gameCourt: ', gameDate, selectedTime, userID, ampm, locationPref, myReservation)
        const params = {
          gameDate: gameDate,
          selectedTime: selectedTime,
          userID: userID,
          ampm: ampm,
          locationPref: locationPref,
          myReservation: myReservation,
          guestCount: guestCount
        }
        let res = await axios.get(myroute, { params })
  //      console.log('ES completed saving myTime result is: ', res.data)
          return res.data
          },

    async getMyTime(userID, gameDate, ampm) {
      let myroute = servername + '/getmytime'
//      console.log('getmytime route: about to make the call to api. gameDate, gameCourt: ', gameDate, userID, ampm)
      const params = {
        gameDate: gameDate,
        userID: userID,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
//      console.log('ES getMyTime result is: ', gameDate, userID, ampm, res.data)
        return res.data
        },

    async getEarliestTime(gameDate, ampm) {
      let myroute = servername + '/getearliesttime'
//      console.log('getearliesttime route: about to make the call to api. gameDate,ampm: ', gameDate, ampm, )
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
//      console.log('ES getEarliestTime result is: ', gameDate, ampm, res.data.recordsets[0])
        return res.data
        },

    async getPlayerCount(gameDate, ampm) {
      let myroute = servername + '/getplayercount'
 //     console.log('getplayercount route: about to make the call to api. gameDate,ampm: ', gameDate, ampm)
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
 //     console.log('ES getplayercount result is: ', res.data)
        return res.data
        },

    async resignMyGame(userID, gameDate, ampm) {
      let myroute = servername + '/resigngame'
//      console.log('resigngame route: about to make the call to api. gameDate,ampm: ', userID, gameDate, ampm)
      const params = {
        userID: userID,
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
//      console.log('ES resignMyGame result is: ', gameDate, ampm, res.data)
        return res.data
        },

    async weather() {
//      console.log('starting weather in es')
        const params = {
          key: '9a9a5cdaf4164cb99de181002210712',
          q: '66061',
          days: 7,
          aqi: 'no', 
          alerts: 'no'
        }
    
      await axios.get('http://api.weatherapi.com/v1/forecast.json', {params})
      .then((weather) => {
//        console.log('es weather is: ', weather);
        return weather
      })

      },

    async getPlayers() {
    let myroute = servername + '/getPlayers'
//    console.log('getPlayers route: about to make the call to api. ')
    let res = await axios.get(myroute)
//    console.log('ES getPlayers result is: ', res.data)
      return res.data
      },

  async getInvitations() {
    let myroute = servername + '/getInvitations'
//    console.log('getInvitations route: about to make the call to api. ')
    let res = await axios.get(myroute)
//    console.log('ES getPlayers result is: ', res.data)
      return res.data
      },

  async deleteInvitation(invitationID) {
    let myroute = servername + '/deleteInvitation'
//    console.log('deleteInvitation: about to make the call to api.  ', invitationID)
    const params = {
      invitationID: invitationID}
    let res = await axios.get(myroute, { params });
    return res.data;
  },
    
    
  async getNotes(gameDate, ampm) {
    let myroute = servername + '/getNotes'
//    console.log('getNotes: about to make the call to api.  ', gameDate, ampm)
    const params = {
     gameDate: gameDate,
     ampm: ampm}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async deleteNote(noteID) {
    let myroute = servername + '/deleteNote'
//    console.log('deleteNotes: about to make the call to api.  ', noteID)
    const params = {
     noteID: noteID}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async addNote(gameDate, ampm, userID, noteText) {
    let myroute = servername + '/addNote'
 //   console.log('getGameNotes: about to make the call to api.  ', gameDate, ampm, userID, noteText)
    const params = {
     gameDate: gameDate,
     ampm: ampm,
     userID: userID,
     noteText: noteText}
    let res = await axios.get(myroute, { params });
    return res.data.returnValue;
  },

     async getPlayer(playerID) {
      let myroute = servername + '/getPlayer'
//      console.log('getPlayer route: about to make the call to api. playerID: ', playerID)
      const params = {
        playerID: playerID}
      let res = await axios.get(myroute, { params })
//      console.log('ES getPlayer result is: ', res.data)
        return res.data
        },


    async editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine) {
      let myroute = servername + '/editPlayer'
//      console.log('editPlayer route: about to make the call to api. playerID: ', playerID)
      const params = {
        playerID: playerID,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        email: email,
        areaCode: areaCode,
        prefixCode: prefixCode,
        phoneLine: phoneLine }
      let res = await axios.get(myroute, { params })
 //     console.log('ES editPlayer result is: ', res.data)
        return res.data
        },

        async addFaq(faqQuestion, faqAnswer) {
          let myroute = servername +  '/addFaq'
      //    console.log('addFaq: about to make the call to api. ', faqQuestion, faqAnswer)
          const params = {
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer}
          let res = await axios.get(myroute, { params })
       //   console.log('ES addFaq result is: ', res.data)
            return res.data
            },   

        async deleteFaq(faqID) {
          let myroute = servername +  '/deleteFaq'
      //    console.log('addFaq: about to make the call to api. ', faqQuestion, faqAnswer)
          const params = {
            faqID: faqID}
          let res = await axios.get(myroute, { params })
        //   console.log('ES deleteFaq result is: ', res.data)
            return res.data
            },

        async getFaqs() {
          let myroute = servername +  '/getFaqs'
      //    console.log('getFaqs: about to make the call to api. ')
          let res = await axios.get(myroute)
        //   console.log('ES getFaqs result is: ', res.data)
            return res.data
            },  

        async getFaq(faqID, faqQuestion, faqAnswer) {
          let myroute = servername +  '/getFaq'
          console.log('getFaq: about to make the call to api. ', faqID)
          const params = {
            faqID: faqID,
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer
          }
          let res = await axios.get(myroute, { params })
        //   console.log('ES getFaq result is: ', res.data)
            return res.data
            },

        async editFaq(faqID, faqQuestion, faqAnswer) {
          let myroute = servername +  '/editFaq'
          console.log('editFaq: about to make the call to api. ', faqID, faqQuestion, faqAnswer)
          const params = {
            faqID: faqID,
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer}
          let res = await axios.get(myroute, { params })
        //   console.log('ES editFaq result is: ', res.data)
            return res.data
            }, 

    async getEvent(eventID) {
      let myroute = servername +  '/getEvent'
 //     console.log('getFaq: about to make the call to api. ', eventID)
      const params = {
        eventID: eventID,
      }
      let res = await axios.get(myroute, { params })
    //   console.log('ES getFaq result is: ', res.data)
        return res.data
        },

      async getEvents() {
        let myroute = servername +  '/getEvents'
//        console.log('getEvents: about to make the call to api. ')
        let res = await axios.get(myroute)
      //   console.log('ES getFaq result is: ', res.data)
          return res.data
          },

      async addEvent(eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails) {
        let myroute = servername +  '/addEvent'
//        console.log('addEvent: about to make the call to api. ', eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails)
        const params = {
          eventTitle: eventTitle,
          eventHostess: eventHostess,
          eventLocation: eventLocation,
          eventDate: eventDate,
          eventTime: eventTime,
          inviteBringing: inviteBringing,
          eventDetails: eventDetails  
        }
        let res = await axios.get(myroute, { params })
      //   console.log('ES addEvent result is: ', res.data)
          return res.data
          },

      async deleteEvent(eventID) {
        let myroute = servername +  '/deleteEvent'
//        console.log('getFaq: about to make the call to api. ', eventID)
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
      //   console.log('ES getFaq result is: ', res.data)
          return res.data
          },

      async getEvent(eventID) {
        let myroute = servername +  '/getEvent'
 //       console.log('getEvent: about to make the call to api. ', eventID)
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
      //   console.log('ES getEvent result is: ', res.data)
          return res.data
          },

      async getAttendees(eventID) {
        let myroute = servername +  '/getAttendees'
//        console.log('getAttendees: about to make the call to api. ', eventID)
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
      //   console.log('ES getEvent result is: ', res.data)
          return res.data
          },

      async acceptRsvp(eventID, userID) {
        let myroute = servername +  '/acceptRsvp'
  //       console.log('acceptRsvp: about to make the call to api. ', eventID, userID)
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
  //       console.log('ES getEventStatus result is: ', res.data)
          return res.data
          }, 

      async cancelRsvp(eventID, userID) {
        let myroute = servername +  '/cancelRsvp'
  //       console.log('cancelRsvp: about to make the call to api. ', eventID, userID)
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
  //       console.log('ES getEventStatus result is: ', res.data)
          return res.data
          }, 
          
      async getEventStatus(eventID, userID) {
        let myroute = servername +  '/getEventStatus'
 //       console.log('getEventStatus: about to make the call to api. ', eventID, userID)
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
  //       console.log('ES getEventStatus result is: ', res.data)
          return res.data
          },          
   }