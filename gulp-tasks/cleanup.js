const del = require('del');
	
module.exports = (path) => {
	return () => {
		console.log('Cleaning old files...');
		del([path.distDir]).then(paths => {
			console.log('Deleted files and folders:\n', paths.join('\n'));
		});
	};
}