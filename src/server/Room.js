const {
    createSocket
} = require('node:dgram')

const Logger = require('../util/Logger')

module.exports = class Room {

    constructor(address, port) {
        this._address = address
        this._port = port
        this._socket = createSocket('udp4')
    }

    createRoom() {
        this._listenErrorEvent()
        this._listenMessageEvent()
        this._socket.bind(this._port, this._address, () => {
            Logger.info(`Room::createRoom::created ${this._address}:${this._port} room with success`)
        })
    }

    _listenErrorEvent() {
        this._socket.on('error', (error) => {
            Logger.error(`Room::_listenErrorEvent::${error.message}`)
        })
    }
    
    _listenMessageEvent() {
        this._socket.on('message', (message, remoteAddressInformation) => {
            Logger.info(`Room::_listenMessageEvent::${remoteAddressInformation.address}:${remoteAddressInformation.port} agent say: ${message}`)
        })
    }

    destroyRoom() {
        this._socket.close(() => {
            Logger.info(`Room::destroyRoom::destroyed ${this._address}:${this._port} room with success`)
        })
    }

}