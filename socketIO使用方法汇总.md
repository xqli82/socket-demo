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

## socket处理
```
io.on('connection', socket => {
socket.emit('request', /* … */); // emit an event to the socket
io.emit('broadcast', /* … */); // emit an event to all connected sockets
socket.on('reply', () => { /* … */ }); // listen to the event
});
```
## query认证
```
const socket = io('http://localhost?token=abc');
//或者
//const socket = io('http://localhost,{
    query:{
        token:'abc
    }
});

// server-side
const io = require('socket.io')();

// middleware 连接认证
io.use((socket, next) => {
  let token = socket.handshake.query.token;
  if (isValid(token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

// then 权限认证
io.on('connection', (socket) => {
  let token = socket.handshake.query.token;
  // ...
});
```

The query content can also be updated on reconnection:
```
socket.on('reconnect_attempt', () => {
  socket.io.opts.query = {
    token: 'fgh'
  }
});
```
## socket.id socket连接的唯一标识
```
const socket = io('http://localhost');
console.log(socket.id); // undefined
socket.on('connect', () => {
  console.log(socket.id); // 'G5p5...'
});
```

## 手动重连
```
const socket = io({
  autoConnect: false
});
// 手动连接:Manually opens the socket
socket.open();
```

## 自动重连
```
socket.on('disconnect', () => {
  socket.open();
});
```
## socket.emit(eventName[, ...args][, ack])
```
socket.emit('ferret', 'tobi', (data) => {
  console.log(data); // data will be 'woot'
});

// server:
//  io.on('connection', (socket) => {
//    socket.on('ferret', (name, fn) => {
//      fn('woot');
//    });
//  });
```
## socket.on(eventName, callback)
```
socket.on('news', (data) => {
  console.log(data);
});

// with multiple arguments
socket.on('news', (arg1, arg2, arg3, arg4) => {
  // ...
});
// with callback
socket.on('news', (cb) => {
  cb(0);
});
```
## socket.close()
Disconnects the socket manually.