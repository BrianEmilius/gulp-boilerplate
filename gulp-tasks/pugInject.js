let gulp 	= require('gulp'),
	plumber = require('gulp-plumber'),
	notify  = require('gulp-notify'),
	inject  = require('gulp-inject');
	
module.exports = (path) => {
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
			.pipe(inject(sources, {
				addRootSlash: false
			}))
			.pipe(gulp.dest(path.devDir));
	};
}