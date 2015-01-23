App.PersonRoute = Ember.Route.extend({

	setupController: function(controller, model){
		return App.PersonsRepository.getById(model.id).then(function(data){
			controller.set('model', data);
		});
	}
})