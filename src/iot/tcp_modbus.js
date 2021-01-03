const net = require('net')
const Modbus = require('jsmodbus')

class TcpModbus {
    constructor(options) {
        this.host = options.host
        this.port = options.port
        this.connectStatus = false
        this.socket = new net.Socket()
        this.client = new Modbus.client.TCP(this.socket)
        this.init()
        this.connect()
    }
    init() {
        this.socket.on('connect', () => {
            console.log('connect')
            this.connectStatus = true
        })
        this.socket.on('error', (err) => {
            console.log(err)
        })
        this.socket.on('close', () => {
            console.log('close')
            setTimeout(() => {
                this.connect()
            }, 5000);
        })
    }
    connect() {
        this.socket.connect({
            host: this.host,
            port: this.port
        })
    }
    readHoldRegs(startNum, readCount) {
        return new Promise((resolve, reject) => {
            this.client.readHoldingRegisters(startNum, readCount)
                .then(function (resp) {
                    resolve(resp.response._body.valuesAsArray)
                }).catch(function (err) {
                    reject(err)
                })
        })

    }
}

module.exports = TcpModbus