const mongoose=require('mongoose');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/travel')

// connection check

connect.then(()=>{
    console.log('database connected successfully');
})
.catch(()=>{
  console.log('database not connected');
})

// create a schema
const LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    

})
// collection Part
const collection= new mongoose.model('users',LoginSchema)

module.exports=collection;