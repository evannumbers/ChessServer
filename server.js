var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PythonShell = require('python-shell');

var PORT = 14377;

app.get('*', function(req, res){
	res.sendFile('index.html', {'root': './'});
});

function newBoard(socket){
	var board = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	             ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	             ['.', '.', '.', '.', '.', '.', '.', '.'],
	             ['.', '.', '.', '.', '.', '.', '.', '.'],
	             ['.', '.', '.', '.', '.', '.', '.', '.'],
	             ['.', '.', '.', '.', '.', '.', '.', '.'],
	             ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	             ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']]
	for(var r=0; r<8; r++){
		for(var c=0; c<8; c++){
			socket.emit('setPiece', {r:r, c:c, piece:board[r][c]});
		}
	}
}

var pyOptions = {
    scriptPath : './',
    pythonOptions: '-u'
};
var shell = new PythonShell('chess_engine.py', pyOptions);
shell.on('message', function(message) {
    message = message.split(' ');
    if(message.length == 3){
        io.emit('setPiece', {r:message[0], c:message[1], piece:message[2]})
    }
    else if(message.length == 2){
    	io.emit('setScore', {player:message[0], score:message[1]})
    }
});

io.on('connection', function(socket){
	newBoard(socket);
});

http.listen(PORT, function(){
	console.log('Listening on localhost:' + PORT);
});