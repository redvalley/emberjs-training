
App.PersonController = Ember.Controller.extend({
	needs: ['persons'],

	actions:{
		save: function(){

			alert('We have now ' + this.get('controllers.persons.model').length + ' persons!')
		}
	}
});