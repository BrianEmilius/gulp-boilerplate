let gulp 		= require('gulp'),
	browserSync = require('browser-sync');
	
module.exports = (path) => {
	return () => {
		browserSync.init({
			port: 8090,
			server: {
				baseDir: path.distDir
			},
					ui: {
						port: 8080
					}
		});
	};
}