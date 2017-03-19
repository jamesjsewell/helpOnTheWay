import React from 'react'
import Backbone from 'backbone'
import ACTIONS from '../../actions.js'
console.log('???')

var SignUpComponent = React.createClass({
	_createAction: function(evt) {
		console.log('clickedit!')
		evt.preventDefault()
		ACTIONS.createNewUser({
			email:evt.target.email.value,
			userName:evt.target.userName.value,
			password:evt.target.password.value
		})
	},
	render: function () {
		if(this.props.loggedIn === false || this.props.loggedIn === undefined){
			console.log('rendering sign in')
			return(
				<div id = "signup" className = "SignUpComponent col-sm-5 offset-sm-1 p-4">
					<form id = "registerForm" onSubmit={this._createAction}>
						<h3 id="registerH3">Register:</h3>
						<label id="registerLabel">Email Address</label>
						<input type="text" className="form-control py-1" name="email" placeholder="Enter Email Address" />
						<label id="registerLabel">User Name</label>
						<input placeholder="Enter User Name" type="text" name="userName" className="form-control py-1" />
						<label id="registerLabel">Password</label>
						<input type="password" className="form-control py-1" name="password" placeholder="Enter Password" />
						<button type="submit" className="btn btn-primary mt-1 col-sm-8 offset-sm-2">Submit</button>	
					</form>
				</div>
			)
		}
		else{

			return(null)

		}
	}
})

export default SignUpComponent 