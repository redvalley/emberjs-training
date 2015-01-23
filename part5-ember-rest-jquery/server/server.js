var express = require('express');


var server = express();

server.use('/', express.static(__dirname + '/../client'));


server.use('/api/persons/:id', function(req, res, next){
	if(req.params.id === '1'){
		res.send({
			id: 1,
			firstName: 'Rupert',
			lastName: 'Eder'
		});
	}else{
		res.send({
			id: 2,
			firstName: 'Sandra',
			lastName: 'Eder'
		});
	}
	

});



server.use('/api/persons', function(req, res, next){

	res.send([
	{
		id: 1,
		firstName: 'Rupert',
		lastName: 'Eder'
	},
	{
		id: 2,
		firstName: 'Sandra',
		lastName: 'Eder'
	}
	])

});


server.listen(3000);