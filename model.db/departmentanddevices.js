const mongoose=require("mongoose")
const department=mongoose.Schema({
    DPname:{
        type:String,
        required:true
    },
    
   
    DPID:{
        type:Object,
        required:true
    },
   DPlocation:{
        type:Object,
        required:true
    },
    doctor_id:{
        type:Array,
        required:true
    },
   
  

})
const device=mongoose.Schema({
   Code:{
        type:String,
        required:true
    },
    PPM:{
        type:Number,
        required:true
    },
   Manufacturer:{
        type:String,
        required:true
    },
    dep_id:{
        type:Object,
        required:true
    },

   


})
dep_data=mongoose.model('department',department)
device_data=mongoose.model('device',device)
module.exports={dep_data:dep_data,device_data:device_data}


