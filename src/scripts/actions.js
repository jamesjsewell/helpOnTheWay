//imports
import Backbone from 'backbone';
import {User} from './models/models'
import STORE from './store'
import $ from 'jquery'

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

                //adds user's group info to the store
                
                STORE._set({loggedIn: true})
                location.hash=`home`

            }

        )

    },

    //returns the user's id for the user auth model given user data
    getCurrentIDUser: function(){

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
                    STORE._set({"groupCollection":groupColl}))
            
            }

            else{
                //STORE._set({"currentGroup":this.getgroupCollection()})
                User.getUsersGroups()
                User.getCurrentUser()
                console.log('user already in group')
                return('inGroup')
            }

        }
      
    },

    //returns collection of data for current group
    getgroupCollection: function(){

         // return STORE.data.groupCollection.fetch()
         return STORE.data.groupCollection.fetch()

    },

    setCurrentSingleGroup: function(groupID){
        //User.getUsersGroups()
        //User.getCurrentUser()
        // var groupColl = this.getgroupCollection()
        // var groupModels = STORE.data.groupCollection.models
        // console.log(STORE.data.groupCollection.models)
        // for(var i = 0; i < groupModels.length; i++){
        //     console.log(groupModels[i])
        //     console.log(groupModels[i].attributes._id)
        //     if(groupModels[i].attributes._id === groupID){
        //         var groupName = groupModels[i].attributes.name
        //         var groupDescription = groupModels[i].attributes.description
        //         var groupPurpose = groupModels[i].attributes.purpose
        //         var groupUsers = groupModels[i].attributes.members.length
        //         STORE._set({currentGroup: {name: groupName, description: groupDescription, purpose: groupPurpose, users: groupUsers}})
        //     }
        // }

        var getGroup = this.returnGroup(groupID)

        getGroup.then(

        (groupInfo) => {
   
        STORE._set({'groupInfo': groupInfo})
        console.log(groupInfo)
        for(var i = 0; i < groupInfo.length; i++){
            console.log(groupInfo[i].name)
            if(groupInfo[i]._id === groupID){
                STORE._set({currentGroup: {name: groupInfo[i].name, description: groupInfo[i].description, purpose: groupInfo[i].purpose, users: groupInfo[i].members.length}})
            }
        }
        
        }, 

        (err) => {

        console.log('did not retrieve data',err)

        })
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

    returnGroupsForUser: function(userId){

        return $.ajax({
            method: 'GET',
            type: 'json',
            url: `api/users/${userId}/groups`

        })

    },
    returnGroup: function(groupID){

        return $.ajax({
            method: 'GET',
            type: 'json',
            url: `api/groups`

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
    },


}

setNavBarLoginStatus()
function setNavBarLoginStatus(){

    if(User.getCurrentUser()){

        STORE._set({loggedIn: true})
    }

}

export default ACTIONS