const express = require('express')
const app =express()
const web =require('./routes/web')
const connectDb = require('./database/dbcon')
const flash = require('connect-flash');//send a message for ..correct email
const session = require('express-session')//use for alert

const setUserInfo = require('./middleware/setUserInfo')
require('dotenv').config()


//image upload form se controller ke pass jati hai


const cookieParser = require('cookie-parser')//for the cookies we use npm i cookies from this sisde

//for get token
app.use(cookieParser())
app.use(setUserInfo);

//message
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));
//Flash Mesaage
app.use(flash())
//connectdb
connectDb()
//view ejs
app.set('view engine', 'ejs')
//css image js link
app.use(express.static('public'))


app.use(express.urlencoded())






//route load
app.use('/',web)

//server start
app.listen(process.env.PORT,()=>{
    console.log(`server start localhost:${process.env.PORT}`)
})



