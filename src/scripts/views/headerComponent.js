import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import NavBarComponent from './components/navBar.js'
import ACTIONS from './../actions.js'
import LogoComponent from './components/logoComponent.js'

//header of a page
var HeaderComponent = React.createClass({
	getUserName:function(){
		if (ACTIONS.loginOrLogoutNav() === 'logout'){
			return `Logged in as: ${ACTIONS.getCurrentUserName()}`
		}
		else
		{
			return ''
		}
	},
	//builds a navbar on the fly using predefined buttons passed down into the props of NavBarComponent. the 
	//'predefined buttons' are set in the navButtons property as an object of buttons
	//each button in the object is also an object that has a 'key' for the name of the 
	//button and the hash route link of the button.
	render: function() {
		return (
			<div className = "headerContainer" id="header">
				<LogoComponent />
				<nav className="headerComponent navbar navbar-light bg-faded navbar-toggleable-md">
					<NavBarComponent navButtons = {{
						"button1": {"name": "Home", "link": "#home"},
						"button2": {"name": "Groups", "link": "#allgroups"},
						"button3": {"name": "Create Group", "link": "#registergroup"},
						"button4": {"name": ACTIONS.loginOrLogoutNav(), "link": "#"+ACTIONS.loginOrLogoutNav()}
					}}/>
					<h4>{this.getUserName()}</h4>
				</nav>
			</div>
		)
	}
})

export default HeaderComponent