let gulp 	     = require('gulp'),
	notify       = require('gulp-notify'),
	gulpSequence = require('gulp-sequence'),
	prompt       = require('gulp-prompt');
	
module.exports = (path, options) => {
	return () => {
		gulp.src(path.devDir + 'assets/javascripts/test.js')
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
	}
}