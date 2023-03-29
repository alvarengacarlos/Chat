const {
    createInterface
} = require('node:readline');
const {
    exit
} = require('process')
const {
    info
} = require('console')

const Agent = require('./client/Agent')

const cliInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'chat> '
});

const agent = new Agent()

cliInterface.prompt()
cliInterface.on('line', async (input) => {    
    const inputSplited = input.split(' ')
    const command = inputSplited.shift()
    const arguments = inputSplited.length == 0 ? '' : inputSplited

    switch(command) {
        case 'exit':
            await agent.destroySocket()
            exit(0)            
        case 'help':
            showCommands()
            break
        case 'connect':            
            await agent.connectToTheRoom(arguments[0].trim(), arguments[1].trim())
            break
        case 'disconnect':
            await agent.disconnectFromRoom()
            break
        case 'sendMessage':            
            agent.sendMessage(arguments.join(' ').trim())
            break
        default:
            info('use \'help\' to show commands')
    }
    
    cliInterface.prompt()
})

function showCommands() {
    info('connect 127.0.0.1 3000')
    info('sendMessage hello, world')
    info('disconnect')
    info('exit')
}