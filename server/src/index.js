const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {

    console.log("socket connected");

    socket.on("todosChanged", () => {
        socket.broadcast.emit('reRenderTodos', 're-render todos')
    });

    socket.on("tasksChanged", (todoId) => {
        socket.broadcast.emit('reRenderTasks', todoId)
    });

});

server.listen(port, () => {
    console.log("server started on port " + port);
});