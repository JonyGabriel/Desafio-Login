import  express  from "express"
import session from "express-session"
import MongoStore from "connect-mongo"

const app = express ()
const uri = 'mongodb+srv://jonygabriiel:Jony2915.@clusterjony.eun5mgo.mongodb.net/'


app.use (session({
  store: MongoStore.create({
    mongoUrl: uri,
    dbName: 'clase19'
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true


}))

app.get ('/', (req, res) => res.send ('ok'))
app.get ('/login', (req, res) => {
  if (req.session.user) return res.send ('Already logged')

  const { username } = req.query
  if (!username) return res.status (400).send('Need an username')
  req.session.user = username
return res.send ('login success')

})

function auth (req, res, next){
  return req.session?.user ? next() : res.status(401).send ('Auth error')
}

app.get ('/private', auth, (req, res) => {
  res.send (`Private page ${JSON.stringify(req.session.user)}`)
})

app.listen (8080, () => {console.log('Running...')})
