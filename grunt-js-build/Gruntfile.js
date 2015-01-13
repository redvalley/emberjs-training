module.exports = function(grunt) {
	
	
	function adjustTemplateName(name) {
		var startPattern = /view\//,
		      endPattern = /\.hbs$/
                      templateName = '';
		
		templateName = name.replace(startPattern, '');
		templateName = templateName.replace(endPattern, '');
		console.log('Using template name: <' + templateName + '> for file: ' + name);

		return templateName;
	};

	grunt.initConfig({
		emberTemplates: {
		    compile:{
				options:{
					namespace: 'Ember.TEMPLATES',
					templateName: adjustTemplateName
				},
				files: {'templates.js': 'view/**/*.hbs'}
			}

		},
		
		
		concat: {
		    dist: {
			src:['**/*.js', '!Gruntfile.js', '!templates.js', '!bower_components/**/*.js', '!node_modules/**/*.js'],
			dest:'app-concat.js',
			filter: 'isFile'
		    }
		},

		watch: {
		    scripts: {
				files:['**/*.*', '!templates.js', '!app-concat.js' ],
				tasks:['clean', 'concat',  'emberTemplates'],
				options: {
				    livereload: true
				}
		    }
		},

		clean: ['app-concat.js', 'templates.js']
	
	});
	
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('default', ['clean', 'emberTemplates', 'concat', 'watch']);
	
}
