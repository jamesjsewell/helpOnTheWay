import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

var FooterComponent = React.createClass({
	render: function() {
		return (
			<footer id = "footerFooter" className="footer sticky-bottom navbar navbar-light bg-faded navbar-toggleable-md">
				<ul id = "footerUl" className="navbar-nav">
					<li className = "nav-item mx-2">
						<a href="#home" className="nav-link">Home</a>
					</li>
					<li className = "nav-item mx-2">
						<a href="#registergroup" className="nav-link">Register Your Group</a>
					</li>
					<li className = "nav-item mx-2">
						<a href="#allgroups" className="nav-link">Groups</a>
					</li>
					<li className = "nav-item mx-2">
						<a href="#contact" className="nav-link">Contact</a>
					</li>
					<li className = "nav-item mx-2">
						<a href="http://justiceforvets.org/what-is-a-veterans-treatment-court" className="nav-link" target="_blank">Education</a>
					</li>
				</ul>

			</footer>
		)
	}
})

export default FooterComponent