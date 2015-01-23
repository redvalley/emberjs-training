var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.Router.map(function(){
	this.resource('persons', { path: '/persons'}, function(){
		this.resource('person',{ path: '/:id'})
	})
});



window.App = app;
