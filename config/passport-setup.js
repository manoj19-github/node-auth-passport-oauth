const passport=require("passport")
const GoogleStrategy=require("passport-google-oauth20")
const User=require("../models/userModel")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")

passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
  const _user=await User.findById(id)
  if(_user){
    done(null,_user)
  }
})
passport.use(new GoogleStrategy({
  // option for the google strategy
  callbackURL:"/auth/google/redirect",
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET
},(accessToken,refreshToken,profile,done)=>{
  // passport callback function
  console.log("passport callback function fired")
  console.log(profile)
  User.findOne({googleId:profile.id},
  (error,currentUser)=>{
    if(error) console.log(error)
    if(currentUser){
      console.log(`you are logged in`)
      done(null,currentUser)
    }else{
      const _user=new User({
        userName:profile.displayName,
        googleId:profile.id
      })

      _user.save((err,newUser)=>{
        if(err) console.log(`error occured `,err)
        if(newUser) console.log(`new user created `,user)
      })
      done(null,newUser)
    }
  })
}))
