const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    adminname:{
        type:String,
        required:true
    },
    adminmail:{
        type:String,
        required:true
    }
})

const  Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;