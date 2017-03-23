// include gulp
const gulp = require('gulp'), // duh?

// include plugins
			browserSync  = require('browser-sync'),  // synchronized browser testing
			reload       = browserSync.reload,       // browser reload event
			changed      = require('gulp-changed'),  // checks for changed files in destination directory
			del          = require('del'),           // delete directories and folders
			gulpSequence = require('gulp-sequence'), // run gulp tasks in sequence
			inject       = require('gulp-inject'),   // inject scripts and css in HTML documents
			prompt       = require('gulp-prompt'),   // add interactions to gulp tasks
			pug          = require('gulp-pug'),      // HTML templating
			sass         = require('gulp-sass'),     // sass compiler
			notify		 = require('gulp-notify'),
			plumber		 = require('gulp-plumber'),

// constants
			path = {
				devDir          : './dev/',                                                      // development directory path
				distDir         : './dist/',                                                     // distribution directory path
				angularJS       : './node_modules/angular/angular.min.js',                       // angular.min.js path
				jqueryJS        : './node_modules/jquery/dist/jquery.min.js',                    // jquery.min.js path
				materializeCSS  : './node_modules/materialize-css/dist/css/materialize.min.css', // materialize css path
				materializeJS   : './node_modules/materialize-css/dist/js/materialize.min.js',   // materialize js path
				materializeFont : './node_modules/materialize-css/dist/fonts/**/*',              // materialize fonts path
				bootstrapCSS    : './node_modules/bootstrap/dist/css/bootstrap.min.css',         // bootstrap css path
				bootstrapJS     : './node_modules/bootstrap/dist/js/bootstrap.min.js',           // bootstrap js path
				bootstrapFont   : './node_modules/bootstrap/dist/fonts/*',                       // bootstrap fonts path,
				notifyIcon		: ''															 // notify icon
			};
function getTask(task) {
    return require('./gulp-tasks/' + task)(path);
}

// build materialize files
gulp.task('buildMaterialize', () => {
	console.log('Building with Materialize...');
	gulp.src(path.materializeCSS)
		.pipe(gulp.dest(path.distDir + 'assets/stylesheets'));
	gulp.src([path.materializeJS, path.angularJS, path.jqueryJS])
		.pipe(gulp.dest(path.distDir + 'assets/javascripts'));
	gulp.src(path.materializeFont)
		.pipe(gulp.dest(path.distDir + 'assets/fonts'));
}); // buildMaterialize

// build bootstrap files
gulp.task('buildBootstrap', () => {
	console.log('Building with Bootstrap...');
	gulp.src(path.bootstrapCSS)
		.pipe(gulp.dest(path.distDir + 'assets/stylesheets'));
	gulp.src([path.bootstrapJS, path.jqueryJS])
		.pipe(gulp.dest(path.distDir + 'assets/javascripts'));
	gulp.src(path.bootstrapFont)
		.pipe(gulp.dest(path.distDir + 'assets/fonts'));
}); // buildBootstrap

// inject in pugs
gulp.task('pugInject', getTask('pugInject'));

// build basic template file
gulp.task('buildPage', ['pugInject'], getTask('buildPug')); // buildPage

// serve dist with browser-sync
gulp.task('serve', () => {
	browserSync.init({
		port: 8090,
		server: {
			baseDir: path.distDir
		},
				ui: {
					port: 8080
				}
	});
});

// clean up distribution directory
gulp.task('cleanup', () => {
	console.log('Cleaning old files...');
	return del([path.distDir]).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

// default gulp task
gulp.task('default', ['cleanup'], () => {

	return gulp.src(path.devDir + 'assets/javascripts/test.js')
		.pipe(notify("Hello buddy"))
		.on('error', notify.onError({
			title: 'Default task Error',
			subtitle: '<%= error.relativePath %>:<%= error.line %>',
			message: '<%= error.messageOriginal %>',
			open: 'file://<%= error.file %>',
			onLast: true,
			icon: path.notifyIcon
		}))
		.pipe(prompt.prompt([{
			type:    'checkbox',
			name:    'packages',
			message: 'Which packages would you like to build with?',
			choices: ['Materialize/Angular', 'Bootstrap/jQuery'],
			validate: (packages) => {
				if (typeof packages[0] == 'undefined' && packages[0] == null) {
					return false;
				}
				return true;
			}
		}], (res) => {
			if (res.packages.indexOf('Materialize/Angular') > -1) {
				gulpSequence('buildMaterialize')();
			}
			if (res.packages.indexOf('Bootstrap/jQuery') > -1) {
				gulpSequence('buildBootstrap')();
			}
		}));
	
});