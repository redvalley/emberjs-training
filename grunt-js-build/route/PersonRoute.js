App.PersonRoute = Ember.Route.extend({
	model: function(params){
		return TestData.find(function(x){
			return x.id = params.id;
		});
	}
})