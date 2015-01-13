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
