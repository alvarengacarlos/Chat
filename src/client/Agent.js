const {
    createSocket
} = require('node:dgram')
const { 
    notStrictEqual
} = require('node:assert')

const Logger = require('../util/Logger')

module.exports = class Agent {

    constructor() {        
        this._socket = createSocket('udp4')
    }

    async connectToTheRoom(address, port) {
        notStrictEqual(!address, true, new Error('Agent::connectToTheRoom::address is required'))
        notStrictEqual(!port, true, new Error('Agent::connectToTheRoom::address is required'))

        this._listenErrorEvent()
        return new Promise((resolve) => {
            try {
                this._socket.connect(port, address, () => {
                    Logger.info(`Room::connectToTheRoom::connected to the ${address}:${port} room with success`)
                    return resolve()
                })
            } catch (error) {
                if (error.code == 'ERR_SOCKET_DGRAM_IS_CONNECTED') {
                    Logger.error('Room::disconnectFromRoom::it is already connected to room')
                
                } else {
                    Logger.error(`Room::disconnectFromRoom::${error.message}`)
                }

            } finally {
                return resolve()
            }
        })
    }

    _listenErrorEvent() {        
        this._socket.on('error', (error) => {
            Logger.error(`Room::_listenErrorEvent::${error.message}`)
        })
    }
    
    async disconnectFromRoom() {
        return new Promise((resolve) => {
            try {
                this._socket.disconnect()
                Logger.info(`Room::disconnectFromRoom::disconnected from room with success`)

            } catch (error) {
                if (error.code == 'ERR_SOCKET_DGRAM_NOT_CONNECTED') {
                    Logger.error(`Room::disconnectFromRoom::it is not connected room`)
                } else {
                    Logger.error(`Room::disconnectFromRoom::${error.message}`)
                }
                
            } finally {
                return resolve()
            }
        })
    }
    
    async destroySocket() {
        return new Promise((resolve) => {
            this._socket.close(() => {
                Logger.info(`Room::destroyConnection::socket detroyed with success`)
                return resolve()
            })
        })
    }

    async sendMessage(message) {
        return new Promise((resolve) => {
            try {
                this._socket.send(message)
                Logger.info('Room::sendMessage::sent message with success')
                
            } catch (error) {
                if (error.code == 'ERR_SOCKET_BAD_PORT') {
                    Logger.error(`Room::sendMessage::it is not connected room`)
                } else {
                    Logger.error(`Room::sendMessage::${error.message}`)
                }
            } finally {
                return resolve()
            }
        })
    }

}