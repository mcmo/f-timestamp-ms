'use strict'
const Hapi = require('hapi')
const Path = require('path')

const server = new Hapi.Server()

server.connection({ port: process.env.PORT || 8080 })

server.register(require('inert'), () => {
  
  server.route({
    method: 'GET',
    path: '/{date}',
    handler: dateHandler
  })
  
  // server static assets
  server.route({
    path: '/css/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: './public/css',
        listing: false
      }
    }  
  })
  
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('public/index.html');
    }
  })
  
  server.start(() => console.log('Started'))
})

function dateHandler(request, reply) {
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  
  const d = request.params.date
  let date = new Date(d)
  date = date == 'Invalid Date' ? new Date(Number(d)) : date

  let dateObj = {
    unix: date.getTime(),
    natural: date != 'Invalid Date' ? months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() : null
  }
  reply(dateObj)
}

