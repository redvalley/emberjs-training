App.PersonRoute = Ember.Route.extend({
	model: function(params){
		return App.PersonsRepository.getById(params.id);
	},

	setupController: function(controller, model){
		controller.set('currentModel', App.Registry.getValue('currentUser'));

		controller.set('model', model);
	}
})