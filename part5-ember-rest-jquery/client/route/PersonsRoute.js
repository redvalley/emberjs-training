
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