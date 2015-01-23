var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.Router.map(function(){
	this.resource('persons', { path: '/persons'}, function(){
		this.resource('person',{ path: '/:id'})
	})
});



window.App = app;

App.ApplicationController = Ember.Controller.extend({
	
	init: function(){
		this.set('showAdContent', true);
	},

	

	showAdContent: null,

	actions:{
		manipulateViews: function(){
			Ember.instrument("viewManipulation", { myPayload: true}, function(){

			},{});
		}
	}
});

App.PersonController = Ember.Controller.extend({
	needs: ['persons'],

	actions:{
		save: function(){

			alert('We have now ' + this.get('controllers.persons.model').length + ' persons!')
		}
	}
});
App.PersonsController = Ember.Controller.extend({
	
});
App.Person = Ember.Object.extend({
	id: null,
	firstName: null,
	lastName: null,
	fullName: function(){
		return this.firstName + ' ' + this.lastName;
	}.property('firstName', 'lastName'),

	isValid: null,

	validate: function(){
		return this.firstName && this.lastName;
	},

	validationObserver: function(){
		this.set('isValid',this.validate());
		
	}.observes('firstName', 'lastName').on('init')
});



App.PersonsRepository = {
	getAll: function(){
		return Ember.$.getJSON('api/persons').then(function(data){
			var modelResult = Ember.A();

			data.forEach(function(currentPerson){
				modelResult.addObject(App.Person.create(currentPerson));
			})

			return modelResult;
		});


	},
	getById: function(id){
		return Ember.$.getJSON('api/persons/' + id).then(function(data){
			return App.Person.create(data);
		});


	}


}


App.PersonRoute = Ember.Route.extend({
	model: function(params){
		return App.PersonsRepository.getById(params.id);
	},

	setupController: function(controller, model){
		controller.set('currentModel', App.Registry.getValue('currentUser'));

		controller.set('model', model);
	}
})

App.PersonsRoute = Ember.Route.extend({
	model: function(){
		return App.PersonsRepository.getAll();
	},

	afterModel: function(model){
		console.log('in after model');
	},

	setupController: function(controller, model){
		controller.set('model', model);
	}
});
App.Registry = {
	_interalRegistry:[],

	setValue: function(name, value){
		this._interalRegistry[name] = value;

	},

	getValue: function(name){
		return this._interalRegistry[name];		
	}

}

