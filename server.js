const Hapi = require('hapi')

const port = process.env.PORT || 8080

const server = new Hapi.Server()

server.connection({
    port: 8080
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('hello hapi')
    }
})

server.start(() => console.log('Started'))
