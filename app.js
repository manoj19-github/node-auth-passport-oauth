require("dotenv").config()
const express=require("express")
const app=express()
const passport=require("passport")
const authRoutes=require("./routes/auth-routes")
const {profileRoutes,authCheck}=require("./routes/profile-routes")
const passportSetup=require("./config/passport-setup")
const connectDB=require("./config/db")
const cookieSession=require("cookie-session")
connectDB()


//set up the view engine
app.set("view engine","ejs")

//route
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[process.env.JWT_SECRET_TOKEN]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",authRoutes)
app.use("/profile",authCheck,profileRoutes)
app.get("/",(req,res)=>{
  res.render("home",{user:req.user})
})


app.listen(3000,()=>{
  console.log(`app now listening on port 3000`)
})
