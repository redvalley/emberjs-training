App.Registry = {
	_interalRegistry:[],

	setValue: function(name, value){
		this._interalRegistry[name] = value;

	},

	getValue: function(name){
		return this._interalRegistry[name];		
	}

}

