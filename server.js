'use strict'
const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || 8080
})

function handler(request, reply) {
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

server.route({
  method: 'GET',
  path: '/{date}',
  handler: handler
})

server.start(() => console.log('Started'))
