var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('clientkeeper', ['clients']);

// Set Static Folder
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());

app.get('/clients', function(){
  var id = req.params.id;

	db.clients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		if(err){
			res.send(err);
		} else {
			res.json(doc);
		}
	});
});

app.post('/clients', function(){
  console.log('Request for clients received...');

	db.clients.find().sort({first_name: 1}, function(err, docs){
		if(err){
			res.send(err);
		} else {
			console.log('Sending Data...');
			res.json(docs);
		}
	});
});

app.get('/clients/:id', function(req, res){
	var id = req.params.id;

	db.clients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		if(err){
			res.send(err);
		} else {
			res.json(doc);
		}
	})
});

app.delete('/clients/:id', function(req, res){
	var id = req.params.id;
	db.clients.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		if(err){
			res.send(err);
		} else {
			console.log('Client Removed');
			res.json(doc);
		}
	});
});

app.listen(3000);
console.log('Ready on port 3000...');