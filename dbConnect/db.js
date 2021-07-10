const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.url,{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true} ,(err)=>{
    if (err) throw err;
    console.log('connected')
})   

module.exports=mongoose    