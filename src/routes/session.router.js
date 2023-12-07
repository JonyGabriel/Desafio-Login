import { Router } from "express";
import UserModel from "../models/user.models.js";

const router = Router()
router.post('/register', async (req,res)=>{

  const user= req.body;

  if(user.email == 'adminCoder@coder.com' && user.password != 'adminCod3r123' ) {
      return res.status(401).send({error:'Usuario no autorizado'})
  }

  if(user.email == 'adminCoder@coder.com' && user.password == 'adminCod3r123'){
      user.role= 'admin'
  }

  try {
  await UserModel.create(user);

  return res.redirect('/');
  } catch (error) {
      res.status(400).send({fail:error})
  }
})

router.post ('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await UserModel.findOne ({email, password})

  if (!user) return res.status (404).send ('user not found')

  req.session.user = user
  
return res.redirect ('/') 
})

router.post ('/register', async (req, res) =>{
  const user = req.body
  await UserModel.create (user)
  return res.redirect ('/')

})

router.get ('/logout', (req,res) => {
  req.session.destroy(err => {
    if(err) return res.send ('Logout ERROR')
    
    return res.redirect('/')
  })
})
export default router 