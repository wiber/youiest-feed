var toUser = {
	  "_id": "nicolsondsouza",
	  "inbox": [],
	  "outbox": [],
	  "follow": []
	};
var fromUser = {
  "_id": "eliasmoosman",
  "inbox": [],
  "outbox": [],
  "follow": []
}
DummyData = {
  "_id": "mTFJJYEMHscg62HdP",
  "from": fromUser._id,
  "to": toUser._id,
  "picture_low": "http://i.imgur.com/DM4ZEp8.jpg"
}

if(Meteor.isServer){
	Meteor.publish(null,function(){
		return W.find({});
	});
	Meteor.publish(null,function(){
		return WI.find({});
	});

	WI.remove({});
	W.remove({});

	

	WI.insert(fromUser);
	WI.insert(toUser);

	Unionize.connect(DummyData);
}
if(Meteor.isClient){
	Tinytest.add("FeedList - Check if feedlist has DOM in data",function(test,next){
		// Session.set("imageId",DummyData._id);
		// setTimeout(function(){
		var DomElement = React.renderComponentToString(Feed.feedList(null))
		// console.log(DomElement.match("DM4ZEp8")[0])
		test.equal(DomElement.match("DM4ZEp8")[0],"DM4ZEp8", "didn't found image");
		// if(next)
		// 	next();
		// },1000);
	});
}
