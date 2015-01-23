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
			src:['**/*.js', '!Gruntfile.js', '!config/TestConfig.js', '!templates.js', '!bower_components/**/*.js', '!node_modules/**/*.js', '!test/**/*.js'],
			dest:'app-build.js',
			filter: 'isFile'
		    }
		},

		uglify: {
		    options: {
		      mangle: true
		    },
		    prod: {
		      files: {
		       'app.min.js': [
		       'bower_components/amplify/lib/amplify.js',
		       'bower_components/jquery/dist/jquery.js',
			   'bower_components/bootstrap/dist/js/bootstrap.js',
			   'bower_components/handlebars/handlebars.js',
			   'bower_components/ember/ember.js',
			   'templates.js',
		       'app-build.js']
		      }
		    }
  		},

		watch: {
		    scripts: {
				files:['**/*.*', '!templates.js', '!app-build.js' ],
				tasks:['clean', 'concat',  'emberTemplates'],
				options: {
				    livereload: true
				}
		    }
		},

		karma: {
			single:{
				options:{
					frameworks: ['qunit'],
					reporters:['progress', 'junit'],
					files:[
					'bower_components/jquery/dist/jquery.js',
					'bower_components/amplify/lib/amplify.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'bower_components/handlebars/handlebars.js',
					'bower_components/ember/ember.js',
					'bower_components/ember/ember-testing.js',
					'templates.js',
					'app-build.js',
					'test/**/*.js',
					'config/TestConfig.js',
					'!config/AppConfig.js']
				},
				singleRun: true,
				autowatch: false,
				browsers: ['PhantomJS']
			}
		},

		connect: {
          server: {
            options: {
              port: 9001,
              base: '.'
            }
          }
        },

		clean: ['app-build.js', 'app.min.js', 'templates.js']
	
	});
	
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test',['clean','emberTemplates', 'concat', 'karma:single']);
	grunt.registerTask('default', ['clean', 'emberTemplates', 'concat', 'watch']);
	grunt.registerTask('prod', ['clean', 'emberTemplates', 'concat', 'uglify']);
	
}
