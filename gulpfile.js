// include gulp
const gulp = require('gulp'), // duh?
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
				notifyIcon      : ''                                                             // notify icon
			};
getTask = (task, options) => {
	return require('./gulp-tasks/' + task)(path, options);
}

// build materialize files
gulp.task('buildMaterialize', getTask('installer', {package: 'materialize'})); // buildMaterialize

// build bootstrap files
gulp.task('buildBootstrap', getTask('installer', { package : 'bootstrap'})); // buildBootstrap

// inject in pugs
gulp.task('pugInject', getTask('pugInject'));

// build basic template file
gulp.task('buildPage', ['pugInject'], getTask('buildPug')); // buildPage

// serve dist with browser-sync
gulp.task('serve', getTask('browserSync'));

// clean up distribution directory
gulp.task('cleanup', getTask('cleanup'));

gulp.task('watch', () => {
	gulp.watch(path.devDir + '**/*.pug', ['buildPage']);
});

// default gulp task
gulp.task('default', ['cleanup'], getTask('init'));