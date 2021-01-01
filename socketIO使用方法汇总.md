# 安装

```
    npm install socket.io
```
# API文档

> https://github.com/socketio/socket.io-client/blob/master/docs/API.md#new-managerurl-options

# 使用
## 服务器端
```
    const app = require('express')();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', () => { /* … */ });
    server.listen(3000);
```
## 客户端
```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();  //默认连接http服务器对应的地址
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
</script>
```
# 基本使用方法

```
    io.on('connection', socket => {
    socket.emit('request', /* … */); // emit an event to the socket
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
    socket.on('reply', () => { /* … */ }); // listen to the event
    });
```