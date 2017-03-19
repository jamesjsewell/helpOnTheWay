import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ACTIONS from '../../actions.js'

var LoginComponent = React.createClass({

	_createAction: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.target.emailLogin.value,evt.target.password.value)
	},

	render: function() {

		if(this.props.loggedIn === false || this.props.loggedIn === undefined){
			return (

			<div id="login" className="loginComponent col-sm-5 offset-sm-1 p-4 ml-0">
				<form id = "loginForm" onSubmit={this._createAction}>
					<h3 id="loginH3">Login:</h3>
					<label id = "loginLabel">Email Address</label>
					<input id = "emailInput" placeholder="Email Address" type="text" name="emailLogin" className="form-control py-1" />
					<label  id = "loginLabel">Password</label>
					<input type="password" className="form-control py-1" name="password" placeholder="Enter Password" />
					<button className="btn mt-1 col-sm-8 offset-sm-2" id="loginButton">Login</button>
				</form>
			</div>
			)
		}
		else{
			return(null)
		}
	}
})
// justify-content-center
export default LoginComponent