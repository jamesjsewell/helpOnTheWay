import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from '../init'
import HeaderComponent from './headerComponent'
import FooterComponent from './footerComponent'
import STORE from '../store'
import ACTIONS from '../actions'

const GroupsPage = React.createClass({

	componentWillMount: function(){

		ACTIONS.getgroupCollection()

		STORE.on('updateContent', ()=> {

			this.setState(STORE.data)

		})
	},

	getInitialState: function() {

		return STORE.data

	},

	render: function() {

	 	return (
	 		<div  className="container-fluid">
				<HeaderComponent />
	 			<Groups groups={this.state.groupCollection} />
	 			<FooterComponent />
	 		</div>
	 	)
 	}
})

const Groups = React.createClass({

	_renderGroup: function(groupModel) {

	 	return <Group key={groupModel.cid} group={groupModel} groups={this.props.groups} />

	},

	render: function() {

	 	return (
	 		<div className='groups container my-4' >
	 			<h2 className="text-center">Groups</h2>
	 			<div className='list-group col-12'>
	 				{this.props.groups.map(this._renderGroup)}
	 			</div>
	 		</div>
	 	)
 	}
})

const Group = React.createClass({

	_createAction: function(groupID) {

		//ACTIONS.setCurrentGroup(groupID)

		let userID = ACTIONS.getCurrentIDUser()
		var addUser = ACTIONS.addUserToGroup(userID,groupID,this.props.groups)

		// console.log(this.props.groups)
		// var groupModels = this.props.groups.models
		
		// for(var i = 0; i < groupModels.length; i++){
		// 	console.log(groupModels[i])
		// 	if(groupModels[i].attributes._id === groupID){
		// 		var groupName = groupModels[i].attributes.name
		// 		var groupDescription = groupModels[i].attributes.description
		// 		var groupPurpose = groupModels[i].attributes.purpose
		// 		var groupUsers = groupModels[i].attributes.members.length
		// 		STORE._set({currentGroup: {name: groupName, description: groupDescription, purpose: groupPurpose, users: groupUsers}})
		// 	}
		// }
		ACTIONS.setCurrentSingleGroup(groupID)
		location.hash=`group/${groupID}`
		
	},

	render: function() {

		var joinOrOpen = 'Join Group'

		if(ACTIONS.returnUserGroups().includes(this.props.group.get('_id'))){

			joinOrOpen = 'Open Group'

		}

	 	return (
			<div>
				<h3 className="list-group-item bg-faded">{this.props.group.get('name')}</h3>
				<h4 className="list-group-item bg-faded">Description: {this.props.group.get('description')}</h4>
				<p className="list-group-item  secondary small bg-faded">Purpose: {this.props.group.get('purpose')}</p>
				<button className="btn btn-primary my-1 col-sm-3" onClick={(ev) => this._createAction(this.props.group.get('_id'))}>{joinOrOpen}</button>
			</div>

	 	)
 	}
})

export default GroupsPage

