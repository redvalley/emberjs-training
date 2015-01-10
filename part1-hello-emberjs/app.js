var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});

app.ApplicationController = Ember.Controller.extend({
  firstName: "Rupert",
  lastName: "Eder"
});


window.App = app;
