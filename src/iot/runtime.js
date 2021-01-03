const tcpModbus = require('./tcp_modbus')
const thingsModel = require('./testModel')
const config = require('../config/index')

class iotRunTime {
    constructor(mode, interval) {
        this.runMode = mode,
            this.interval = interval || 2000,
            this.Model = new Proxy(thingsModel, {
                set(targe, key, value) {
                    targe[key].value = value
                    targe[key].update = Date.now()
                    return targe
                }
            })
    }
    run() {
        if (this.runMode === 'production') {
            console.log('production mode is running!')
            this.production()
        } else {
            console.log('develop mode is running!')
            this.development()
        }
    }
    production() {
        const client = new tcpModbus({
            host: config.plcIp,
            port: config.plcPort
        })
        const proFun = async () => {
            let data = await client.readHoldRegs(0, 10)
            this.Model.voltage = data[0]
            this.Model.current = data[1]
            this.Model.speed = data[2]
            this.Model.value1 = data[3]
            this.Model.value2 = data[4]
            this.Model.value3 = data[5]
            this.Model.value4 = data[6]
            this.Model.value5 = data[7]
        }
        this.runtime(proFun)
    }
    development() {
        const devFun = () => {
            this.Model.voltage = 370 + Math.round(Math.random() * 20)
            this.Model.current = 80 + Math.round(Math.random() * 50)
            this.Model.speed = 1400 + Math.round(Math.random() * 100)
            this.Model.value1 = 100 + Math.round(Math.random() * 10)
            this.Model.value2 = 100 + Math.round(Math.random() * 20)
            this.Model.value3 = 100 + Math.round(Math.random() * 30)
            this.Model.value4 = 100 + Math.round(Math.random() * 40)
            this.Model.value5 = 100 + Math.round(Math.random() * 50)
        }
        this.runtime(devFun)

    }
    runtime(fn) {
        setTimeout(async () => {
            await fn()
            this.runtime(fn)
        }, this.interval)
    }
    console(){
        console.log(thingsModel, new Date())
    }
}

module.exports = iotRunTime