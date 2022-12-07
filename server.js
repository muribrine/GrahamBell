function createServer() {
	try {
		/* --- dependencies ---*/
		console.log('starting server... loading dependencies...');
		const express = require('express');
		const ejs = require('ejs');
		const http = require('http');
		const socketIO = require('socket.io');
		const path = require('path');
		console.log('depencies loaded successfully.');
		/* --- --- ---*/

		/* --- Parameters ---*/
		console.log('Loading parameters...');
		const publicFolder = 'public';
		const publicPath = path.join(__dirname, publicFolder);
		const port = 3000;
		console.log('Parameters loaded successfully.');

		/* --- --- ---*/

		/* --- protocols setup---*/
		console.log('Defining protocols...');
		const app = express();
		const server = http.createServer(app);
		const io = socketIO(server);
		console.log('Protocols defined successfully.');
		/* --- --- ---*/

		/* --- server setup---*/
		console.log('setting up server...');
		app.use(express.static(publicPath));
		app.set('views', publicPath);
		app.engine('html', ejs.renderFile);
		app.set('view engine', 'html');

		app.use('/', (req, res) => {
			res.render('app.html');
		});

		console.log('Server setup completed. Listening to port ' + port);
		console.log('http://localhost:' + port + '/');

		server.listen(port);
		/* --- --- ---*/
	} catch (error) {
		console.error(error);
	}
}

createServer();
