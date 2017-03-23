let gulp 	= require('gulp'),
	plumber = require('gulp-plumber'),
	notify  = require('gulp-notify'),
	pug     = require('gulp-pug');
	
module.exports = (path) => {
	return () => {
		gulp.src(path.devDir + '*.pug')
			.pipe(plumber({
				errorHandler: notify.onError({
					title: 'Pug Error',
					subtitle: '<%= error.relativePath %>:<%= error.line %>',
					open: 'file://<%= error.file %>',
					onLast: true,
					icon: ''
				})
			}))
			.pipe(pug({
				pretty: true
			}))
			.pipe(gulp.dest(path.distDir))
	};
}