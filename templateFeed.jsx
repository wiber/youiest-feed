/*** @jsx React.DOM */
userId = "nicolsondsouza";
var feedList = new React.createClass({
	getInitialState: function(){
		// var inbox = [];
		// var user = Meteor.users.findOne(userId);
		// if(user && user.inbox)
		// 	inbox = user.inbox
		return {
			inbox: Session.get("inbox")
		}
	},
	componentDidMount: function(){
		var self = this;
		Tracker.autorun(function(){
			self.setState({inbox: Session.get("inbox")});
			// var inbox = [];
			// var user = Meteor.users.findOne(userId);
			// if(user && user.inbox)
			// 	inbox = user.inbox;
			// self.setState({inbox: inbox});
		});
	},
	onClickFeed: function(currentInbox){
		var inbox = this.state.inbox;
		// console.log(currentInbox)
		for(var i=0,il=inbox.length;i<il;i++){
			if(inbox[i]._id == currentInbox._id){
				inbox[i].active = "active";
			}
			else{
				inbox[i].active = "";	
			}
		}
		this.setState({inbox: inbox})
	},
	"render": function(){
		// if(this.state.user && this.state.user.inbox){
		var self = this;
		feedlist = this.state.inbox.map(function(feedData){
			return (
				<feed feedData={feedData} onClickFeed={self.onClickFeed}/>
			)	
		});
		return (
			<div className="ui tiny images">
				{feedlist}
			</div>
		)
		// }
		// else{
		// 	return (
		// 		<div> </div>
		// 	)	
		// }
		
	}
});
Feed.feedList = feedList;

var feed = new React.createClass({
	"onClickFeed": function(){
		var feedData = this.props.feedData;
		// console.log(this.props.feedData)
		// Session.set("imageId",this.props.feedData._id);
		this.props.onClickFeed(this.props.feedData);
		var user = Meteor.users.findOne({'_id': userId});
		if(user && user.big && user.big.length == 1){
			var big = user.big[0];
			Meteor.users.update({'_id': userId},{
				$push: {"seen": big}
	    });
		}
		Meteor.users.update({'_id': userId},{
			$pull: {"inbox": {"_id": feedData._id}},
    	$set: {"big": []}
    });
    Meteor.users.update({'_id': userId},{
    	$push: {"big": feedData}
		});
		// this.onMakeSeen(this.props.feedData);
	},
	"render": function(){
		// console.log(this.props.feedData)
		var className = "ui small images "+(this.props.feedData.active||"")
		return( 
			// <a href={"/image/" + this.props.feedData._id}> 
				<img className={className} src={this.props.feedData.image_low} onClick={this.onClickFeed}/>
			// </a>
		)
	},
	"onMakeSeen": function(feedData){
		// Meteor.setTimeout(function(){
			// console.log(feedData._id)
			var find = {"_id": userId, "inbox._id": feedData._id};
			var update = {$set: {"inbox.$.seen": true}};
			// Meteor.call("updateUserElement",find, update);
			// Meteor.users.update(,
			// 	)
			// Meteor.users.findOne({"_id": userId});
		// },1000);
	}
});
// db.foo.update({"array.value" : 22}, {"$set" : {"array.$.text" : "blah"}})
Feed.feed = feed;

Template.feedPackage.rendered = function(){
	React.renderComponent(<feedList />, document.getElementById('feedPackage'))
}