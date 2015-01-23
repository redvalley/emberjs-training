test('validate person with missing firstName will set isValid to false', function(){
	var myTestPerson = App.Person.create({
		firstName: null,
		lastName: 'Zaglauer'
	});
	
	myTestPerson.validate();

	ok(!myTestPerson.isValid);
});

test('validate person with missing lastName will set isValid to false', function(){
	var myTestPerson = App.Person.create({
		firstName: 'Dominik',
		lastName: null
	});
	
	myTestPerson.validate();

	ok(!myTestPerson.isValid);
});

test('validate person with missing lastName and firstName will set isValid to false', function(){
	var myTestPerson = App.Person.create({
		firstName: null,
		lastName: null
	});
	
	myTestPerson.validate();

	ok(!myTestPerson.isValid);
});


test('validate person with lastName and firstName will set isValid to true', function(){
	var myTestPerson = App.Person.create({
		firstName: 'Dominik',
		lastName: 'Zaglauer'
	});
	
	myTestPerson.validate();

	ok(myTestPerson.isValid);
});