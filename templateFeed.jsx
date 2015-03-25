/*** @jsx React.DOM */
userId = "nicolsondsouza";
var feedList = new React.createClass({
	getInitialState: function(){
		var inbox = [];
		var user = Meteor.users.findOne(userId);
		if(user && user.inbox)
			inbox = user.inbox
		return {
			inbox: inbox
		}
	},
	componentDidMount: function(){
		var self = this;
		Tracker.autorun(function(){
			var inbox = [];
			var user = Meteor.users.findOne(userId);
			if(user && user.inbox)
				inbox = user.inbox;
			self.setState({inbox: inbox});
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
		// console.log(this.props.feedData)
		Session.set("imageId",this.props.feedData._id);
		this.props.onClickFeed(this.props.feedData);
	},
	"render": function(){
		// console.log(this.props.feedData)
		var className = "ui small images "+(this.props.feedData.active||"")
		return( 
			// <a href={"/image/" + this.props.feedData._id}> 
				<img className={className} src={this.props.feedData.picture_low} onClick={this.onClickFeed}/>
			// </a>
		)
	}
});
Feed.feed = feed;

Template.feedPackage.rendered = function(){
	React.renderComponent(<feedList />, document.getElementById('feedPackage'))
}