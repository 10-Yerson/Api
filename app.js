const express = require('express')
const Contactos_routes = require('./routers/Descripcion')

const app = express()


app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/Contactos', Contactos_routes)


module.exports = app