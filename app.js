const express = require('express')
const app =express()
const port =3000
const web =require('./routes/web')
const connectDb = require('./database/dbcon')


//connectdb
connectDb()
//view ejs
app.set('view engine', 'ejs')
//css image js link
app.use(express.static('public'))








//route load
app.use('/',web)

//server start
app.listen(port,()=>{
    console.log(`server start localhost:${port}`)
})



