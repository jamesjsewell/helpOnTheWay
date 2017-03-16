import React from 'react'
import Backbone from 'backbone'
import HeaderComponent from './headerComponent.js'
import FooterComponent from './footerComponent.js'
import SignUpComponent from './components/signUpComponent.js'
import LoginComponent from './components/loginComponent.js'
import STORE from './../store.js'
import SingleGroupPage from './singleGroupPage.js'
import JoinedGroupsComponent from './groupViews/groupComponents/joinedGroupsComponent.js'
import ACTIONS from './../actions.js'

//renders homepage view
const HomePage = React.createClass({

	componentDidMount: function(){

		ACTIONS.getgroupCollection()

		STORE.on('updateContent', ()=> {

			this.setState(STORE.data)

		})
	},

	getInitialState: function() {
		ACTIONS.getgroupCollection()
		this.setState(STORE.data)
		return STORE.data

	},
	//render's the homepage 
	//add's signup and login component if the user is not logged in
	render: function() {
		
		return (
			<div className="container-fluid">
				<HeaderComponent />
				<div className="auth-container row">
					<SignUpComponent loggedIn = {STORE.data.loggedIn}/>
					<LoginComponent loggedIn = {STORE.data.loggedIn}/> 
					<div className = "groupChatSection container">
						<JoinedGroupsComponent loggedIn = {STORE.data.loggedIn}/>
					</div>
					<div className = "aboutSection container">
						<p> One thing veterans lose when re-entering civilian life is the camaraderie of having a shared experience with other individuals. H.O.W. connects veterans who are going through the court process together so they can share their experiences, stories, and most importantly, get help when they need it. The Veterans Treatment Court model requires regular court appearances, mandatory attendance at treatment sessions, and frequent and random testing for substance abuse. Veterans respond favorably to this structured environment given their past experiences in the Armed Forces. However, a few will struggle and it is exactly those veterans who need H.O.W. the most. Without this structure, these veterans are at a higher risk to reoffend and remain in the criminal justice system. H.O.W. ensures they meet their obligations to themselves, the court, and their community. We hope that by providing an avenue for veterans to walk down together, they will get through the court system without issue and come out with an improved support group on the other side.
						</p>
					</div>

				</div>
				<FooterComponent />
			</div>
		)
	},
	componentWillUnmount: function(){
		
	}

	// componentDidMount:function(){
		
	// 	//listens for a change on the store, sets this component to re-render with new info
	// 	STORE.on('updateContent', () => {
	// 		this.setState(STORE.data)
	// 	})
		
	// }
})

export default HomePage