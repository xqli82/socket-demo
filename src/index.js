const http = require('http')
const express = require('express')
const Socket = require('socket.io')
const path = require('path')
const iot = require('../src/iot/runtime')
const { json } = require('express')

const iotInstance = new iot(require('../src/config').runMode, 2000)  //production or development
iotInstance.run()

const app = express()
app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const server = http.createServer(app)

//websocket
const io = Socket(server)
const sockets=[]
io.on('connect', socket => {
    console.log('socket conncet,id is:', socket.id)
    sockets.push(socket)
})
io.on('disconnect', () => {
    console.log('disconnect')
})
setInterval(() => {
    io.emit('msg', iotInstance.Model)
    console.log(sockets.map(item=>{
        return {
            id:item.id,
            connect_status:item.connected
        }
    }))
}, 2000);

//http lisenter
server.listen(3000, function () {
    console.log('server is running on port:3000')
})