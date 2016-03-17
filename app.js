var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('clientkeeper', ['clients']);

// Set Static Folder
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
	console.log('Request for clients recieved...');

	db.clients.find(function(err, docs){
		if(err){
			res.send(err);
		} else {
			console.log('Sending Data...');
			res.json(docs);
		}
	});
});

app.listen(3000);
console.log('Ready on port 3000...');