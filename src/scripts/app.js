import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomePage from './views/homePage'
import GroupSignUpView from './views/groupCreateView'
import NavBarComponent from './views/components/navBar'
import SingleGroupPage from './views/singleGroupPage'
import GroupsPage from './views/groupsPage'
import ACTIONS from './actions.js'
import STORE from './store.js'

var app = function() {
	var HelpRouter = Backbone.Router.extend({
		routes: {
			"home": "showLoginPage",
			"registergroup": "showGroupsPage",
			"group/:groupId": "showSingleGroup",
			"allgroups": "showAllGroups",
			"logout": "handleLogout",
			"*defaultRoute": "showLoginPage" 
		},

		showLoginPage: function() {
			ReactDOM.render(<HomePage />, document.querySelector('.container'))
		},

		showGroupsPage: function() {
			ReactDOM.render(<GroupSignUpView />, document.querySelector('.container'))
		
		},
		showSingleGroup: function (groupId){
			console.log('render single group page')
			ReactDOM.render(<SingleGroupPage groupID={groupId} />, document.querySelector('.container'))
		},
		showAllGroups: function (){
			ReactDOM.render(<GroupsPage />, document.querySelector('.container'))
		},
		handleLogout: function(){
			
			if(STORE.data.loggedIn === true){
				ACTIONS.logUserOut()
				console.log("user " + ACTIONS.getCurrentUserName() + " has logged out")
				this.handleRedirect()
			}
		},
		handleRedirect: function(){
			location.hash = "#home"
		}
	})
	new HelpRouter
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..