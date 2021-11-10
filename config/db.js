const mongoose=require("mongoose")
const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.DB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      
    })

  }catch(err){
    console.log(`database connection failed `,err)
  }
  const connection = mongoose.connection
  if(connection.readyState>=1){
    console.log(`connected to database successfully`)
    return;
  }
  connection.on("error",()=>{
    console.log(`sorrry database connection failed`)
  })
}
module.exports=connectDB
