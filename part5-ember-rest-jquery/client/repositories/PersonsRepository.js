

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