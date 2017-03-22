// include gulp
var gulp = require('gulp'),        // duh?

// include plugins
	pug    = require('gulp-pug'),    // HTML templating
	inject = require('gulp-inject'), // inject scripts and css in HTML documents
	prompt = require('gulp-prompt'); // add interactions to gulp tasks

// constants
const DEV_DIR  = './dev/',  // development directory path
			DIST_DIR = './dist/'; // distribution directory path

// default gulp task
gulp.task('default', [], () => {
	gulp.src(DEV_DIR + 'assets/javascripts/test.js')
		.pipe(prompt.prompt({
			type: 'checkbox',
			name: 'packages',
			message: 'Which packages would you like to build with?',
			choices: ['Materialize/Angular1', 'Bootstrap/jQuery']
		}, function(res){
			//value is in res.packages (as an array) 
			console.log(res.packages);
		}));
});