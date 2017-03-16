//imports
import Backbone from 'backbone';
import {User} from './models/models'
import STORE from './store'
import $ from 'jquery'

setNavBarLoginStatus()
function setNavBarLoginStatus(){

    if(User.getCurrentUser()){

        STORE._set({loggedIn: true})

    }

}

//custom actions for the app
let ACTIONS = {

    //takes user data and creates a new user, then logs them in
    createNewUser: function(userData){

        let promise = User.register(userData);
        promise.then(

            (resp)=>{
                console.log('loggin in', resp)
                this.logUserIn(userData.email, userData.password)
            },

            (err)=>{
                alert(`${err.responseText}`)
                console.log('failure!', err)

            }

        )

    },

    //logs user in, takes email and password string
    logUserIn:function(email,password){
        
        let promise = User.login(email,password)
        
        //gets user out of the database and then sets them into the store
        //logs user in and then goes to the 'all groups' page for now
        promise.then(

            (user) => {

                this.getgroupCollection()
                STORE._initialize()
                STORE._set({loggedIn: true})
                location.hash=`home`

            }

        )

    },

    //returns the user's id for the user auth model given user data
    getCurrentIDUser: function(userData){

        return User.getCurrentUser().get('_id'); 

    },

    //returns the username of the current user
    getCurrentUserName: function(){
        
        try{

            if(User.getCurrentUser().get('userName') != undefined ){
                return User.getCurrentUser().get('userName'); 
            }

            else{
                return('')
            }

        }

        catch (e){

            return('')

        }

    },

    //returns the groups a user is part of
    returnUserGroups: function(){
        
        try{

            if(User.getCurrentUser().get('userName') != undefined ){
                return User.getCurrentUser().get('groups'); 
            }

            else{
                return('notUser')
            }

        }

        catch (e){

            console.log('no user')
            return('notUser')

        }

    },

    //sets the navbar 'logout' button to logged in or logged out
    loginOrLogoutNav: function(){
        
        try{
            
            if(STORE.data.loggedIn === false){

                return 'login'

            }

            else{

                return 'logout'

            }
            
        }

        catch (e){

            return ''

        }

    },

    //logs user out by calling the .logout() method on the user model. sets logged in status to false
    logUserOut:function(){
        
        try{

            console.log('logging out')
            User.logout()
            STORE._set({loggedIn: false})

        }

        catch (e){

            STORE._set({loggedIn: false})
            User.logout()
            console.log('no user to logout')
            return('notUser')
            

        } 

    },

    //adds user to a group, takes the user's id and the groups id
    addUserToGroup:function(userID,groupID,groupColl){
        var userInGroup = false
        var usersGroups = this.returnUserGroups(userID)

        if(usersGroups != 'notUser'){

            for(var i = 0; i < usersGroups.length; i++){
              
                if(usersGroups[i] === groupID){
                    userInGroup = true
                    console.log('user is already in group')
                }
            }

            if(userInGroup === false){
                
                return $.ajax({
                    method: 'PUT',
                    type: 'json',
                    url: `api/groups/${groupID}/users/${userID}`},
                    User.getUsersGroups(), User.getCurrentUser(), 
                    STORE._set({"groupCollection":groupColl}))
            
            }

            else{

                console.log('user already in group')
                return('inGroup')
            }

        }
      
    },

    //returns collection of data for current group
    getgroupCollection:function(){

         return STORE.data.groupCollection.fetch()

    },

    //returns all of the messages for a given group, takes group id
    getMessagesByGroup: function(groupID){

        return STORE.data.messageCollection.fetch({

            data: {"groupID": `${groupID}`}

        })

    },

    //returns all of the messages for a given group, takes group id
    getMostRecentMessageFromGroup: function(groupID){

        var stuff = STORE.data.messageCollection.fetch({

            data: {"groupID": `${groupID}`}

            })
        return stuff.response()

    },

    //posts a message to the server given message data
    createNewMessage:function(messageData){

        var promise = $.ajax({

		    method: 'POST',
		    type: 'json',
		    url: `api/messages/`,
            data: {
                posterID:ACTIONS.getCurrentIDUser(),
                title: messageData.title,
                body: messageData.body,
                posterName:ACTIONS.getCurrentUserName(),
                groupID:messageData.groupID
            }

        })

        //adds a new group to the store
        promise.then(STORE.data.messageCollection.fetch({

            data: {"groupID": `${messageData.groupID}`}

        }))

    },

    //posts a new group to the database and loads the new group's page(almost, haven't made a new group page yet)
    createNewGroup:function(groupData){

         var promise = $.ajax({
		    method: 'POST',
		    type: 'json',
		    url: `api/groups/`,
            data: {
                name: groupData.name,
                description: groupData.description,
                purpose:groupData.purpose,
            }
         })
         promise.then((groupInfo) => {
             location.hash = `group/${groupInfo._id}`
         })
    },

    sendEmailToAllMembers:function(messageData,groupID){

        var promise = $.ajax({
		    method: 'GET',
		    type: 'json',
		    url: `api/groups/${groupID}`,
        })

        //adds a new group to the store
        promise.then((group)=>{

            console.log(ACTIONS.getCurrentUserName())
            group.members.forEach((member)=>{
                
                emailjs.send("helpontheway2017_gmail_com", "helpontheway", {
                "to":`${member.email}`,
                "from_name":`${ACTIONS.getCurrentUserName()}`,
                "to_name":`${member.userName}`,
                "message_html":`${messageData.body}!!`})
            })
        })
    }
}

export default ACTIONS