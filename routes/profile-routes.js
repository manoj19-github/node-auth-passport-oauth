const profileRoutes=require("express").Router()
const authCheck=(req,res,next)=>{
  if(!req.user) return res.redirect("/auth/login")
  if(req.user) return next()
}
profileRoutes.get("/",authCheck,(req,res)=>{
    res.render("profile",{user:req.user})
})
module.exports={authCheck,profileRoutes}
