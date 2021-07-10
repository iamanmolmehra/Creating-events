const dbConnect = require('./dbConnect/db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./routes/route'))
app.set('view engine','ejs')

app.listen(process.env.port,()=>{
    console.log(`Server is running ${process.env.port}`)
})