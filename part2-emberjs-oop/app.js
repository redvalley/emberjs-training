var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});



app.ValidationMixin = Ember.Mixin.create({

	errors: null,
	

	validate: function(){
		this.errors = '';
		for(var currentProperty in this){
			if(this.hasOwnProperty(currentProperty) && currentProperty !== 'errors'){
				if(!this[currentProperty]){
					this.errors = this.errors + ' ' + currentProperty;
				}
			}
		}
	}
})

app.Entity = Ember.Object.extend({
	id: null
});




app.Person = app.Entity.extend(app.ValidationMixin, {
	firstName: null,
	lastName: null,
	fullName: function(){
		return this.firstName + ' ' + this.lastName;
	}
});





app.ApplicationController = Ember.Controller.extend({
  init:function(){
  	this._super();
  	this.currentPerson = app.Person.create({
  		id: '10',
  		firstName: 'Rupert',
  		lastName: 'Eder'
  	});

  	this.fullName = this.currentPerson.fullName();
  	this.isValid = this.currentPerson.validate();
  },

  currentPerson: null,
  fullName: '',
  isValid: null,
});


window.App = app;
