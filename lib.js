Feed = {};

Unionize.hooks.feed = function(userId, docs, key){
  
  console.time('hooks.feed');
  log(arguments)
  console.timeEnd('hooks.feed');
   Session.set("Hookfeeds","end");
  log(userId, docs, key);
   W.insert(docs);
}

Unionize.afterhooks.feed = function(userId, docs, key){
  console.time('afterhooks.feed');
  log(arguments)
  console.timeEnd('afterhooks.feed');
  // log(userId, docs, key);
}