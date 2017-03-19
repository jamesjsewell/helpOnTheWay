    import _ from 'underscore'
import Backbone from 'backbone'
import {GroupCollection, GroupModel, MessageCollection, MessageModel} from './models/models'

const STORE = _.extend( Backbone.Events, {

    data: {
        groupCollection: new GroupCollection(),
        groupModel: new GroupModel(),
        messageModel: new MessageModel(),
        messageCollection: new MessageCollection(),
        loggedIn: false,
        flare:false,
        userGroups:{},
        currentGroup:{"name": ""}
    },

    _broadcastChange: function() {
        this.trigger('updateContent')
    },

    _initialize: function() {
        this.data.groupCollection.on('sync update', this._broadcastChange.bind(this)),
        this.data.groupModel.on('sync update', this._broadcastChange.bind(this)),
        this.data.messageModel.on('sync update', this._broadcastChange.bind(this)),
        this.data.messageCollection.on('sync update', this._broadcastChange.bind(this))
    },

    _set: function(attrs) {
        this.data = _.extend({},this.data,attrs)
        this._broadcastChange()
    }
})

STORE._initialize()

export default STORE