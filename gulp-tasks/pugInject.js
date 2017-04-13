const 	gulp 	= require('gulp'),
		plumber = require('gulp-plumber'),
		notify  = require('gulp-notify'),
		inject  = require('gulp-inject');
	
module.exports = (path) => {
	let sources = gulp.src([path.distDir + 'assets/javascripts/*.js', '!' + path.distDir + 'assets/javascripts/jquery.min.js', path.distDir + 'assets/stylesheets/*.css'], {read: false});
	return () => {
		gulp.src(path.devDir + '**/*.pug')
			.pipe(plumber({
				errorHandler: notify.onError({
					title: 'Inject Error',
					subtitle: '<%= error.relativePath %>:<%= error.line %>',
					open: 'file://<%= error.file %>',
					onLast: true,
					icon: path.notifyIcon
				})
			}))
			.pipe(inject(gulp.src(path.distDir + 'assets/javascripts/jquery.min.js', {read: false}), {
				name: 'importantJS',
				ignorePath: 'dist',
				addRootSlash: false
			}))
			.pipe(inject(sources, {
				ignorePath: 'dist',
				addRootSlash: false
			}))
			.pipe(gulp.dest(path.devDir));
	};
}