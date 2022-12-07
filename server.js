function createServer() {
	try {
		/* --- dependencies ---*/
		console.log('Starting server... loading dependencies...');
		const express = require('express');
		const ejs = require('ejs');
		const http = require('http');
		const socketIO = require('socket.io');
		const path = require('path');
		console.log('Depencies loaded successfully.');
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

		/* --- server code---*/
		console.log('Setting up server...');
		app.use(express.static(publicPath));
		app.set('views', publicPath);
		app.engine('html', ejs.renderFile);
		app.set('view engine', 'html');

		app.use('/', (req, res) => {
			res.render('app.html');
		});

		let messages = [];

		io.on('connection', (socket) => {
			console.log(`Connecting socket... SocketID: ${socket.id}`);

			socket.emit('previousMessages', messages);
			console.log(`Sending previous messages to socket ${socket.id}`);

			socket.on('sendMessage', (data) => {
				messages.push(data);
				console.log('Sending new message data to all clients...');
				socket.broadcast.emit('receivedMessage', data);
			});
		});

		console.log(`Server setup completed. Listening to port: ${port}`);
		console.log(`http://localhost:${port}/`);

		server.listen(port);
		/* --- --- ---*/
	} catch (error) {
		console.error(error);
	}
}

createServer();
