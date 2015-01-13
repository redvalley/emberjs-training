var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.Router.map(function(){
	this.resource('persons', { path: '/persons'}, function(){
		this.resource('person',{ path: '/:id'})
	})
});

app.Person = Ember.Object.extend({
	id: null,
	firstName: null,
	lastName: null,
	fullName: function(){
		return this.firstName + ' ' + this.lastName;
	}.property('firstName', 'lastName'),

	isValid: null,

	validationObserver: function(){
		if(!this.firstName || !this.lastName){
			this.set('isValid', false);
		}else{
			this.set('isValid', true);
		}
	}.observes('firstName', 'lastName').on('init')
});

var testData = Ember.A([
			app.Person.create({
				id: '1',
				firstName: 'Rupert',
				lastName: 'Eder'
			}),
			app.Person.create({
				id: '2',
				firstName: 'Sandra',
				lastName: 'Eder'
			})
		]);



app.PersonsRoute = Ember.Route.extend({
	model: function(){
		return testData;
	}
})

app.PersonRoute = Ember.Route.extend({
	model: function(params){
		return testData.find(function(x){
			return x.id = params.id;
		});
	}
})

app.PersonController = Ember.Controller.extend({
	actions:{
		save: function(){
			alert('Person was saved!')
		}
	}
})


window.App = app;
