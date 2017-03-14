import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ACTIONS from '../../actions.js'

var LoginComponent = React.createClass({

	// _createAction: function(evt) {
	// 	evt.preventDefault()
	// 	ACTIONS.createNewUser({
	// 		email:evt.target.email.value,
	// 		userName:evt.target.userName.value,
	// 		password:evt.target.password.value
	// 	})
	// },
	// render: function () {
	// 	console.log('rendering sign in')
	// 	return(
	// 		<div className = "SignUpComponent col-sm-5 offset-sm-1">
	// 			<form onSubmit={this._createAction} id="register">
	// 				<h3>Register:</h3>
	// 				<label>Email Address</label>
	// 				<input type="text" className="form-control" name="email" placeholder="Enter Email Address" />
	// 				<label>User Name</label>
	// 				<input placeholder="Enter User Name" type="text" name="userName" className="form-control" />
	// 				<label>Password</label>
	// 				<input type="password" className="form-control" name="password" placeholder="Enter Password" />
	// 				<button type="submit" form="register" className="btn btn-primary">Submit</button>	
	// 			</form>
	// 		</div>
	// 	)
	// },

	_createAction: function(evt) {
		evt.preventDefault()
		ACTIONS.loginUserIn({
			email:evt.target.userName.value,
			password:evt.target.password.value
		})
	},

	render: function() {
		return (

			<div className="loginComponent col-sm-5 justify-content-center">
				<form onSubmit={this._createAction()}>
					<h2>Login:</h2>
					<label>User Name</label>
					<input placeholder="Enter User Name" type="text" name="userName" className="form-control" />
					<label>Password</label>
					<input type="password" className="form-control" name="password" placeholder="Enter Password" />
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		)
	}
})

export default LoginComponent