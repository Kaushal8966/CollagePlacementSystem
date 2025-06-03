const mongoose = require("mongoose");
const Local_Url="mongodb://127.0.0.1:27017/CollagePlacementSystem"
//collagePlace,ent System //database.name


const connectDb = ()=>{
    return mongoose.connect(Local_Url)
    .then(()=>{
        console.log("Connect Db")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDb