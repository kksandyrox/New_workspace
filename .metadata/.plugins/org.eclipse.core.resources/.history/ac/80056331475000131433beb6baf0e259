var httpd = require('http').createServer(handler); // httpd a web server object, createServer is a function if http module.
var io = require('socket.io').listen(httpd);	//bind the socket object to the web server object
var fs = require('fs');							//a file system module used to read the file.
var usernames = [];
var users ={};

httpd.listen(4000);							//listen for new webclients on port 4000

function handler(req, res) {				//handler is a requestListener Function that is executed when request event is emitted
	fs.readFile('webview.html',				//read file function has 2 parameters, 1) the filename 2) callback function
		function(err , data){				//callback funciton has 2 parameters, error and data, where "data" is the contents of the file 'index.html'
			if (err){
			res.writeHead(500);
			return res.end('Error');
		}
		res.writeHead(200);
		res.end(data);
		}
	);
}



io.sockets.on('connection' , function(socket){
	console.log(socket);
	
	socket.on('clientMessage' , function(content){
		var message = content.trim();
		if(message.substr(0,3) == '/s ') {
			message = message.substr(3);
			var index = message.indexOf(' ');
			if(index !== -1) {
				var name = message.substring(0, index);
				var message = message.substring(index+1);
				if(name in users) {
					users[name].emit('secret', socket.nickname +': said ' + message);				
				} else console.log('Error');
			} else console.log('Error 2');
		} else //socket.broadcast.emit('serverMessage', {msg: message, nick: socket.nickname});
			{
				socket.get('username' , function(err , username) {
				socket.broadcast.emit('serverMessage2' , username + ' said: ' + content);
			});
			}

		socket.emit('serverMessage2' , 'You Said: ' + message);

		// socket.get('username' , function(err , username) {
		// 	if(!username){
		// 		username = socket.id;
		// 	}
		// 	socket.broadcast.emit('serverMessage' , username + ' said: ' + content);
		// });
		//http://www.crictime.com/cricket-streaming-live-1.htm
		
	});


socket.on('login' , function(username) {
	socket.nickname = username;
	users[socket.nickname] = socket;
	console.log(socket.nickname);
	socket.emit('serverMessage2' , 'Logged in as ' + socket.nickname);

	socket.set('username' , username , function(err) {
		if(err) { throw err;}
		if(!username){
			username = socket.id;
		}

		usernames.push(username);
		showUsernames();
		
		function showUsernames(){

			io.sockets.emit('serverUserMessage' , usernames);	
		}
		
		//showUsernames();

		//socket.emit('serverMessage' , 'Logged in as ' + username);
		//socket.broadcast.emit('serverMessage' , username + ' is online');
		//socket.broadcast.emit('serverUserMessage' , username + ' is online');
	});
});
	

socket.on('disconnect' , function(){
	socket.get('username', function(err, username){
		socket.broadcast.emit('serverMessage3' ,  username+ ' left the conversation');
		usernames.splice(usernames.indexOf(username), 1);
		io.sockets.emit('serverUserMessage' , usernames);
	});
	//socket.nickname = username;
	//console.log(socket.nickname);
	//console.log(username);
	//socket.broadcast.emit('serverMessage3' ,  username+ ' left the conversation');
	// socket.get('username' , function(err , username){
	// 	socket.broadcast.emit('serverMessage3' ,  socket.nickname+ ' left the conversation');
	// 	if(!username){
	// 		username = socket.id;
	// 	}
		
		

		
		
	//});
});
socket.emit('login');
});
