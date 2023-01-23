import axios from "axios"

  let servername = 'https://' + window.location.hostname;

    if (servername === 'https://localhost') {
      servername = 'http://localhost:8700';
}

export default {


  //Authentication Stuff
  
  async getUser(userEmail) {
    let myroute = servername + '/user'
    const params = {
     userEmail: userEmail}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async login(userEmail, userPassword) {
    let myroute = servername +  '/auth'
    const params = {
     userEmail: userEmail,
      userPassword: userPassword}
   let res = await axios.get(myroute, { params })
      return res.data
      },

  async getMessages() {
        let myroute = servername + '/getMessages'
        let res = await axios.get(myroute);
        return res.data;
      },

  async sendMessage(userID, messageText) {
    let myroute = servername + '/addMessage'
    const params = {
      userID: userID,
      messageText: messageText}
    let res = await axios.get(myroute, { params });
    return res.data.returnValue;
  },

  async invitePlayer(invitePlayerEmail, userID) {
    let myroute = servername +  '/invitePlayer'
    const params = {
      invitePlayerEmail: invitePlayerEmail,
      userID: userID}
    let res = await axios.get(myroute, { params })
      return res.data
      },      

  async registration(email, firstname, lastname, displayName, password, areaCode, prefixCode, phoneLine, invitationCode) {
    let myroute = servername + '/invitationCheck'
    let params = {
      userEmail: email,
      invitationCode: invitationCode}
    let check= await axios.get(myroute, { params });
      if (check.data === 'invalid') {
        return check.data
      } else {
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
    return res.data;}
  },


      async setMyTime(userID, selectedTime, gameDate, ampm, locationPref, myReservation, guestCount) {
        let myroute = servername + '/setmytime'
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
          return res.data
          },

    async getMyTime(userID, gameDate, ampm) {
      let myroute = servername + '/getmytime'
      const params = {
        gameDate: gameDate,
        userID: userID,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
        return res.data
        },

    async getEarliestTime(gameDate, ampm) {
      let myroute = servername + '/getearliesttime'
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
        return res.data
        },

    async getPlayerCount(gameDate, ampm) {
      let myroute = servername + '/getplayercount'
      const params = {
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
        return res.data
        },

    async resignMyGame(userID, gameDate, ampm) {
      let myroute = servername + '/resigngame'
      const params = {
        userID: userID,
        gameDate: gameDate,
        ampm: ampm}
      let res = await axios.get(myroute, { params })
        return res.data
        },

    async weather() {
        const params = {
          key: '9a9a5cdaf4164cb99de181002210712',
          q: '66061',
          days: 7,
          aqi: 'no', 
          alerts: 'no'
        }
    
      await axios.get('http://api.weatherapi.com/v1/forecast.json', {params})
      .then((weather) => {
        return weather
      })

      },

    async getPlayers() {
    let myroute = servername + '/getPlayers'
    let res = await axios.get(myroute)
      return res.data
      },

      async getFriends() {
        let myroute = servername + '/getFriends'
        let res = await axios.get(myroute)
          return res.data
          },

    async addFriend(friendEmail, friendName, submitter) {
      let myroute = servername +  '/addFriend'
      const params = {
        friendName: friendName,
        friendEmail: friendEmail,
        submitter: submitter}
      let res = await axios.get(myroute, { params })
        return res.data
        },  

        async deleteFriend(friendID) {
          let myroute = servername +  '/deleteFriend'
          const params = {
            friendID: friendID}
          let res = await axios.get(myroute, { params })
            return res.data
            },

      async inviteFriends(gameDate, ampm, userID) {
        let myroute = servername +  '/inviteFriends'
        const params = {
          gameDate: gameDate,
          ampm: ampm,
          userID: userID}
        let res = await axios.get(myroute, { params })
          return 'Invitation Sent'
          },

      async getInvitedFriends(gameDate, ampm) {
        let myroute = servername +  '/getInvitedFriends'
        const params = {
          gameDate: gameDate,
          ampm: ampm}
        let res = await axios.get(myroute, { params })
          return res.data
          },

  async getInvitations() {
    let myroute = servername + '/getInvitations'
    let res = await axios.get(myroute)
      return res.data
      },

  async deleteInvitation(invitationID) {
    let myroute = servername + '/deleteInvitation'
    const params = {
      invitationID: invitationID}
    let res = await axios.get(myroute, { params });
    return res.data;
  },
    
    
  async getNotes(gameDate, ampm) {
    let myroute = servername + '/getNotes'
    const params = {
     gameDate: gameDate,
     ampm: ampm}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async deleteNote(noteID) {
    let myroute = servername + '/deleteNote'
    const params = {
     noteID: noteID}
    let res = await axios.get(myroute, { params });
    return res.data;
  },

  async addNote(gameDate, ampm, userID, noteText) {
    let myroute = servername + '/addNote'
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
      const params = {
        playerID: playerID}
      let res = await axios.get(myroute, { params })
        return res.data
        },


    async editPlayer(playerID, firstName, lastName, displayName, email, areaCode, prefixCode, phoneLine) {
      let myroute = servername + '/editPlayer'
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
        return res.data
        },

        async addFaq(faqQuestion, faqAnswer) {
          let myroute = servername +  '/addFaq'
          const params = {
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer}
          let res = await axios.get(myroute, { params })
            return res.data
            },   

        async deleteFaq(faqID) {
          let myroute = servername +  '/deleteFaq'
          const params = {
            faqID: faqID}
          let res = await axios.get(myroute, { params })
            return res.data
            },

        async getFaqs() {
          let myroute = servername +  '/getFaqs'
          let res = await axios.get(myroute)
            return res.data
            },  

        async getFaq(faqID, faqQuestion, faqAnswer) {
          let myroute = servername +  '/getFaq'
          const params = {
            faqID: faqID,
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer
          }
          let res = await axios.get(myroute, { params })
            return res.data
            },

        async editFaq(faqID, faqQuestion, faqAnswer) {
          let myroute = servername +  '/editFaq'
          const params = {
            faqID: faqID,
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer}
          let res = await axios.get(myroute, { params })
            return res.data
            }, 

    async getEvent(eventID) {
      let myroute = servername +  '/getEvent'
      const params = {
        eventID: eventID,
      }
      let res = await axios.get(myroute, { params })
        return res.data
        },

      async getEvents() {
        let myroute = servername +  '/getEvents'
        let res = await axios.get(myroute)
          return res.data
          },

      async addEvent(eventTitle, eventHostess, eventLocation, eventDate, eventTime, inviteBringing, eventDetails) {
        let myroute = servername +  '/addEvent'
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
          return res.data
          },

      async deleteEvent(eventID) {
        let myroute = servername +  '/deleteEvent'
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          },

      async getEvent(eventID) {
        let myroute = servername +  '/getEvent'
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          },

          async getEventNotes(eventID) {
            let myroute = servername + '/getEventNotes'
            const params = {
             eventID: eventID}
            let res = await axios.get(myroute, { params });
            return res.data;
          },
        
          async deleteEventNote(noteID) {
            let myroute = servername + '/deleteEventNote'
            const params = {
             noteID: noteID}
            let res = await axios.get(myroute, { params });
            return res.data;
          },
        
          async addEventNote(eventID, userID, noteText) {
            console.log('in addEventNote services userID is: ', userID)
            let myroute = servername + '/addEventNote'
            const params = {
             eventID: eventID,
             userID: userID,
             noteText: noteText}
            let res = await axios.get(myroute, { params });
            return res.data.returnValue;
          },

      async getAttendees(eventID) {
        let myroute = servername +  '/getAttendees'
        const params = {
          eventID: eventID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          },

      async acceptRsvp(eventID, userID) {
        let myroute = servername +  '/acceptRsvp'
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          }, 

      async cancelRsvp(eventID, userID) {
        let myroute = servername +  '/cancelRsvp'
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          }, 
          
      async getEventStatus(eventID, userID) {
        let myroute = servername +  '/getEventStatus'
        const params = {
          eventID: eventID,
          userID: userID,
        }
        let res = await axios.get(myroute, { params })
          return res.data
          },          
   }