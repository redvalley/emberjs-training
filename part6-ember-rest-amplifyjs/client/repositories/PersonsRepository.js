

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