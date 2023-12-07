import { Router } from "express";

const router = Router ()

//Middlewares---------------------
function justPublicWithoutSession ( req, res, next){
  if (req.session?.user) return res.redirect('/profile')

  return next()
}

function auth (req, res, next){
  if (req.session?.user) return next()

  res.redirect ('/login')
}

router.get('/api/session/register', auth, (req,res)=>{

  return res.render('register');
});

// Renders------------------------- 

router.get ('/', auth, (req, res) => {
  const user = req.session.user
  return res.render ('index', user)
})

router.get ('/login', justPublicWithoutSession, (req,res) => {
  return res.render ('login', {})
})

router.get ('/register', justPublicWithoutSession, (req, res) => {
  return res.render ('register', {})
})

router.get ('/profile', auth, (req, res) => {
  const user = req.session.user
  res.render ('profile', user)
})




export default router