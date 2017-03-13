import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import NavBarComponent from './components/navBar.js'

var HeaderComponent = React.createClass({
	
	render: function() {
		return (
			<nav className="headerComponent navbar navbar-light py-1 bg-faded navbar-toggleable-md">
				<NavBarComponent navButtons = 
					{{"button1": {"name": "Home", "link": "#home"},
					"button2": {"name": "Contact", "link": "#contact"},
					"button3": {"name": "Groups", "link": "#registergroup"}}
				}/>
			</nav>
		)
	}
})

export default HeaderComponent