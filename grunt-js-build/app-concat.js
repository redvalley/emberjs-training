var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.Router.map(function(){
	this.resource('persons', { path: '/persons'}, function(){
		this.resource('person',{ path: '/:id'})
	})
});



window.App = app;


App.PersonController = Ember.Controller.extend({
	actions:{
		save: function(){
			alert('Person was saved!')
		}
	}
});
App.Person = Ember.Object.extend({
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


window.TestData = Ember.A([
			App.Person.create({
				id: '1',
				firstName: 'Rupert',
				lastName: 'Eder'
			}),
			App.Person.create({
				id: '2',
				firstName: 'Sandra',
				lastName: 'Eder'
			})
		]);

App.PersonRoute = Ember.Route.extend({
	model: function(params){
		return TestData.find(function(x){
			return x.id = params.id;
		});
	}
})

App.PersonsRoute = Ember.Route.extend({
	model: function(){
		return TestData;
	}
});