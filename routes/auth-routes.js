const router=require("express").Router()
const passport=require("passport")
const loginCheck=(req,res,next)=>{
  if(req.user) return res.redirect("/profile")
  if(!req.user) return next()

}
// auth login
router.get("/login",loginCheck,(req,res)=>{
  res.render("login",{user:req.user})
})
// auth logout
router.get("/logout",(req,res)=>{
  req.logout()
  res.redirect("/")
})
// auth with google
router.get("/google",passport.authenticate("google",{
  scope:["profile"]
}))
// callback route for google for redirect
router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
  // res.status(201).json({user:req.user})
  res.redirect("/profile/")


})
// auth logout
router.get("/logout",(req,res)=>{
  // handle with passport
  res.send("logging out")
})
module.exports=router
