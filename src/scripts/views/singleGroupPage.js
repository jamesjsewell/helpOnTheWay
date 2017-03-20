import React from 'react'
import Backbone from 'backbone'
import MessageTextComponent from './groupViews/groupComponents/messageCreate.js'
import HeaderComponent from './headerComponent.js'
import FooterComponent from './footerComponent.js'
import ACTIONS from '../actions.js'
import STORE from '../../scripts/store'
//import Messages from './groupViews/groupComponents/messagesComponent.js'
//import SingleMessage from './groupViews/groupComponents/messagesComponent.js'
//ACTIONS.getgroupCollection()

var groupID = location.hash.split('/')[1]
ACTIONS.setCurrentSingleGroup(groupID)
const SingleGroupPage = React.createClass({

	componentWillMount: function(){
		
		var getGroup = ACTIONS.returnGroup(groupID)

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
        this.setState(STORE.data)
        }, 

        (err) => {

        console.log('did not retrieve data',err)

        })

		ACTIONS.getgroupCollection()
		ACTIONS.getMessagesByGroup(this.props.groupID)
		ACTIONS.setCurrentSingleGroup(groupID)
		STORE.on('updateContent', ()=> {

			this.setState(STORE.data)

		})
	},

	getInitialState: function() {
		STORE._set({currentGroup: {name: "", description: "", purpose: "", users: ""}})
		return STORE.data

	},

	render: function(){
		var groupInfo = STORE.data.currentGroup
		return(
			<div>
				<HeaderComponent />
				<GroupInfo groupName = {groupInfo.name}  groupDescription = {groupInfo.description}  groupPurpose = {groupInfo.purpose}  groupUsers = {groupInfo.users}/>
				<MessageTextComponent flare={this.state.flare} groupID = {this.props.groupID} />
				<Messages messages={this.state.messageCollection} />
				<FooterComponent />
			</div>
			)
	}
})


const GroupInfo = React.createClass({
	 
	 render: function() {
	 	return (
	 		<div className = "groupInfo container-fluid" id="singleGroupInfo" >
	 			<h3>{this.props.groupName}</h3>
				<h4>{this.props.groupDescription}</h4>
				<h4>{this.props.groupPurpose}</h4>
				<h4>{this.props.groupUsers}	members</h4>	
	 		</div>
	 	)
 	}
})

const Messages = React.createClass({
	 _renderMessage: function(messageModel) {
	 	return <Message key={messageModel.cid} message={messageModel} />
	 },
	 render: function() {
	 	return (
	 		<div className='messages' >
	 			<h2>Messages</h2>
	 			<div className='list-group col-12'>
	 				{this.props.messages.map(this._renderMessage)}
	 			</div>
	 		</div>
	 	)
 	}
})

const Message = React.createClass({
	 render: function() {
	 	return (
			 <div className="my-1">
				<h3 className="list-group-item">{this.props.message.get('title')}</h3>
				<p className="list-group-item lead">{this.props.message.get('body')}</p>
				<p className="list-group-item small">Posted By: {this.props.message.get('posterName')}</p>
			</div>
	 	)
 	}
});
	
export default SingleGroupPage