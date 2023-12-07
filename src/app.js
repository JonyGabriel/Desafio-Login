import express  from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'

import __dirname from "./utils.js";
//Def. de variables
const app = express()
const mongoURL = 'mongodb+srv://jonygabriiel:Jony2915.@clusterjony.eun5mgo.mongodb.net/'
const mongoDB = 'clase19'

// config json en el post
app.use (express.json())
app.use (express.urlencoded({extended: true }))

//Handlebars
app.engine ('hbs', handlebars.engine ({extname:'.hbs'}))
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//Sessions
app.use (session({
  store: MongoStore.create({
    mongoUrl: mongoURL,
    dbName: mongoDB
  }),
secret: 'secret',
resave: true,
saveUninitialized: true
}))

//ROUTES
app.get ('/health', (req, res) => res.send (`<h1> OK </h1>`))
app.use ('/api/session', sessionRouter)
app.use ('/', viewsRouter)

//Conexion mongo y run app
mongoose.connect(mongoURL, {dbName: mongoDB})
  .then (()=> {
    console.log('Connected')
    app.listen (8080, () => console.log('Running...'))
  })
  .catch (e => console.error (e))

