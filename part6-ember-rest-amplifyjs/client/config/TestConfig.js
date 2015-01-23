amplify.request.define( "persons-getAll", function(settings){
	settings.success([
		{
			id: 1,
			firstName: 'Rupert',
			lastName: 'Eder'
		},
		{
			id: 2,
			firstName: 'Sandra',
			lastName: 'Eder'
		}
		]
	);
});

amplify.request.define( "persons-getById", function(settings){
	if(settings.data.id == 1){
		settings.success({
			id: 1,
			firstName: 'Rupert',
			lastName: 'Eder'
		});
	}else{
		settings.success({
			id: 2,
			firstName: 'Sandra',
			lastName: 'Eder'
		});
	}
	
});

Ember.testing = true;
App.setupForTesting();
App.injectTestHelpers();