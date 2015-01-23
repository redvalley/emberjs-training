var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.Router.map(function(){
	this.resource('persons', { path: '/persons'}, function(){
		this.resource('person',{ path: '/:id'})
	})
});



window.App = app;


amplify.request.define( "persons-getAll", "ajax", {
    url: "/api/persons",
    dataType: "json",
    type: "GET"
});

amplify.request.define( "persons-getById", "ajax", {
    url: "/api/persons/{id}",
    dataType: "json",
    type: "GET"
});




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
		var promise = new Ember.RSVP.Promise(function(resolve, reject) {

			amplify.request('persons-getAll', function(data){
				var modelResult = Ember.A();

				data.forEach(function(currentPerson){
					modelResult.addObject(App.Person.create(currentPerson));
				})

				resolve(modelResult);

			});
		});

		return promise;
	},
	getById: function(id){
		var promise = new Ember.RSVP.Promise(function(resolve, reject) {

			amplify.request('persons-getById', 
				{id : id},  
				function(data){
					var modelResult = App.Person.create(data);
					resolve(modelResult);
				});
		});

		return promise;
	}


}

App.PersonRoute = Ember.Route.extend({

	setupController: function(controller, model){
		return App.PersonsRepository.getById(model.id).then(function(data){
			controller.set('model', data);
		});
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

