// include gulp
const gulp = require('gulp'), // duh?

// include plugins
			pug    = require('gulp-pug'),    // HTML templating
			inject = require('gulp-inject'), // inject scripts and css in HTML documents
			prompt = require('gulp-prompt'), // add interactions to gulp tasks
			del    = require('del'),         // delete directories and folders
			sass   = require('gulp-sass'),   // sass compiler

// constants
			devDir          = './dev/',                                   // development directory path
			distDir         = './dist/',                                  // distribution directory path
			angularJS       = './node_modules/angular/angular.min.js',    // angular.min.js path
			jqueryJS        = './node_modules/jquery/dist/jquery.min.js', // jquery.min.js path
			materializeCSS  = './node_modules/materialize-css/dist/css/materialize.min.css', // materialize css path
			materializeJS   = './node_modules/materialize-css/dist/js/materialize.min.js',   // materialize js path
			materializeFont = './node_modules/materialize-css/dist/fonts/roboto/*',          // materialize fonts path
			bootstrapCSS    = './node_modules/bootstrap/dist/css/bootstrap.min.css', // bootstrap css path
			bootstrapJS     = './node_modules/bootstrap/dist/js/bootstrap.min.js',   // bootstrap js path
			bootstrapFont   = './node_modules/bootstrap/dist/fonts/*';               // bootstrap fonts path

// build framework files
gulp.task('buildFramework', () => {

	console.log('Cleaning old files...');
	del([distDir]).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});

	gulp.src(devDir + 'assets/javascripts/test.js')
		.pipe(prompt.prompt({
			type:    'checkbox',
			name:    'packages',
			message: 'Which packages would you like to build with?',
			choices: ['Materialize/Angular', 'Bootstrap/jQuery']
		}, (res) => {
			if (res.packages.indexOf('Materialize/Angular') > -1) {
				console.log('Creating Materialize...');
				gulp.src(materializeCSS)
					.pipe(gulp.dest(distDir + 'assets/stylesheets'));
				gulp.src(materializeJS)
					.pipe(gulp.dest(distDir + 'assets/javascripts'));
				gulp.src(materializeFont)
					.pipe(gulp.dest(distDir + 'assets/fonts'));
				gulp.src(angularJS)
					.pipe(gulp.dest(distDir + 'assets/javascripts'));
			}
			if (res.packages.indexOf('Bootstrap/jQuery') > -1) {
				console.log('Creating Bootstrap...');
				gulp.src(bootstrapCSS)
					.pipe(gulp.dest(distDir + 'assets/stylesheets'));
				gulp.src(bootstrapJS)
					.pipe(gulp.dest(distDir + 'assets/javascripts'));
				gulp.src(bootstrapFont)
					.pipe(gulp.dest(distDir + 'assets/fonts'));
				gulp.src(jqueryJS)
					.pipe(gulp.dest(distDir + 'assets/javascripts'));
			}
		}))
});

// default gulp task
gulp.task('default', ['buildFramework'], () => {
	// stuff
});