module.exports = class Logger {

    static info(...data) {
        console.info(`[INFO](${new Date().toISOString()})-> `, ...data)
    }

    static error(...data) {
        console.error(`[ERROR](${new Date().toISOString()})-> `, ...data)
    }

}