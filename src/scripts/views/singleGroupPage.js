import React from 'react'
import Backbone from 'backbone'
import MessageTextComponent from './groupViews/groupComponents/messageCreate.js'
import HeaderComponent from './headerComponent.js'
import FooterComponent from './footerComponent.js'
import ACTIONS from '../actions.js'
import STORE from '../../scripts/store'
//import Messages from './groupViews/groupComponents/messagesComponent.js'
//import SingleMessage from './groupViews/groupComponents/messagesComponent.js'

const SingleGroupPage = React.createClass({

	componentWillMount: function(){
		//STORE._set({"currentGroup":ACTIONS.getgroupCollection(this.props.groupID)})
		ACTIONS.getMessagesByGroup(this.props.groupID)
		STORE.on('updateContent', () => {
			this.setState(STORE.data)
		})

	},
	getInitialState: function() {
		return STORE.data
	},
	render: function (){
		console.log(STORE.data.currentGroup.name)
		return(
			<div>
				<HeaderComponent />
				<h3>{STORE.data.currentGroup.name}</h3>
				<MessageTextComponent flare={this.state.flare} groupID = {this.props.groupID} />
				<Messages messages={this.state.messageCollection} />
				<FooterComponent />
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