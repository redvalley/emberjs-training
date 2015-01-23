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
