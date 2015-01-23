App.ApplicationController = Ember.Controller.extend({
	
	init: function(){
		this.set('showAdContent', true);
	},

	

	showAdContent: null,

	actions:{
		manipulateViews: function(){
			Ember.instrument("viewManipulation", { myPayload: true}, function(){

			},{});
		}
	}
});