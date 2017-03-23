let gulp = require('gulp');
	
module.exports = (path, config) => {
	return () => {
		if(config.package == 'materialize'){
			console.log('Building with Materialize...');
			gulp.src(path.materializeCSS)
				.pipe(gulp.dest(path.distDir + 'assets/stylesheets'));
			gulp.src([path.materializeJS, path.angularJS, path.jqueryJS])
				.pipe(gulp.dest(path.distDir + 'assets/javascripts'));
			gulp.src(path.materializeFont)
				.pipe(gulp.dest(path.distDir + 'assets/fonts'));
		} else if(config.package == 'bootstrap'){
			console.log('Building with Bootstrap...');
			gulp.src(path.bootstrapCSS)
				.pipe(gulp.dest(path.distDir + 'assets/stylesheets'));
			gulp.src([path.bootstrapJS, path.jqueryJS])
				.pipe(gulp.dest(path.distDir + 'assets/javascripts'));
			gulp.src(path.bootstrapFont)
				.pipe(gulp.dest(path.distDir + 'assets/fonts'));
		}
	};
}