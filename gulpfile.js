// include gulp
const gulp = require('gulp'), // duh?

// include plugins
			del          = require('del'),           // delete directories and folders
			gulpSequence = require('gulp-sequence'), // run gulp tasks in sequence
			inject       = require('gulp-inject'),   // inject scripts and css in HTML documents
			prompt       = require('gulp-prompt'),   // add interactions to gulp tasks
			pug          = require('gulp-pug'),      // HTML templating
			sass         = require('gulp-sass'),     // sass compiler

// constants
			devDir          = './dev/',                                                      // development directory path
			distDir         = './dist/',                                                     // distribution directory path
			angularJS       = './node_modules/angular/angular.min.js',                       // angular.min.js path
			jqueryJS        = './node_modules/jquery/dist/jquery.min.js',                    // jquery.min.js path
			materializeCSS  = './node_modules/materialize-css/dist/css/materialize.min.css', // materialize css path
			materializeJS   = './node_modules/materialize-css/dist/js/materialize.min.js',   // materialize js path
			materializeFont = './node_modules/materialize-css/dist/fonts/**/*',              // materialize fonts path
			bootstrapCSS    = './node_modules/bootstrap/dist/css/bootstrap.min.css',         // bootstrap css path
			bootstrapJS     = './node_modules/bootstrap/dist/js/bootstrap.min.js',           // bootstrap js path
			bootstrapFont   = './node_modules/bootstrap/dist/fonts/*';                       // bootstrap fonts path

// build materialize files
gulp.task('buildMaterialize', () => {
	console.log('Building with Materialize...');
	gulp.src(materializeCSS)
		.pipe(gulp.dest(distDir + 'assets/stylesheets'));
	gulp.src(materializeJS)
		.pipe(gulp.dest(distDir + 'assets/javascripts'));
	gulp.src(materializeFont)
		.pipe(gulp.dest(distDir + 'assets/fonts'));
	gulp.src(angularJS)
		.pipe(gulp.dest(distDir + 'assets/javascripts'));
}); // buildMaterialize

// build bootstrap files
gulp.task('buildBootstrap', () => {
	console.log('Building with Bootstrap...');
	gulp.src(bootstrapCSS)
		.pipe(gulp.dest(distDir + 'assets/stylesheets'));
	gulp.src(bootstrapJS)
		.pipe(gulp.dest(distDir + 'assets/javascripts'));
	gulp.src(bootstrapFont)
		.pipe(gulp.dest(distDir + 'assets/fonts'));
	gulp.src(jqueryJS)
		.pipe(gulp.dest(distDir + 'assets/javascripts'));
}); // buildBootstrap

// build template files
gulp.task('buildTemplates', () => {
	gulp.src(devDir + 'assets/javascripts/test.js')
		.pipe(prompt.prompt({
			type:    'checkbox',
			name:    'templates',
			message: 'Which templates would you like in your project?',
			choices: ['Basic frontpage', 'Admin panel']
		}, (res) => {
			console.log(res.templates);
		}));
}); // buildTemplates

// default gulp task
gulp.task('default', () => {
	
	console.log('Cleaning old files...');
	del([distDir])/*.then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	})*/;

	gulp.src(devDir + 'assets/javascripts/test.js')
		.pipe(prompt.prompt([{
			type:    'checkbox',
			name:    'packages',
			message: 'Which packages would you like to build with?',
			choices: ['Materialize/Angular', 'Bootstrap/jQuery']
		},
		{
			type:     'checkbox',
			name:     'templates',
			message:  'Which templates would you like to build into your project?',
			choices:  ['Basic frontpage', 'Admin panel'],
			validate: (templates) => {
				if (typeof templates[0] !== 'undefined' && templates[0] !== null) {
					return true;
				} else {
					return false;
				}
			}
		}], (res) => {
			if (res.packages.indexOf('Materialize/Angular') > -1) {
				gulpSequence('buildMaterialize')();
			}
			if (res.packages.indexOf('Bootstrap/jQuery') > -1) {
				gulpSequence('buildBootstrap')();
			}
			console.log(res.templates);
		}));
	
});