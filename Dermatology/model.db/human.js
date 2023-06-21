const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const admin=mongoose.Schema({
    Aname:{
        type:String,
        required:true
    },
    Aemail:{
        type:String,
        required:true
    },
    Apassword:{
        type:String,
        required:true
    },
    Aphone:{
        type:String,
        required:true
    },
    ASalary:{
        type:Number,
        required:true
    },
    Asex:{
        type:String,
        required:true
    },
    Aage:{
        type:Number,
        required:true
    },
    Aaddress:{
        type:String,
        required:true
    },
   

})
admin.methods.hashpassword=function(Apassword){
    return bcrypt.hashSync(Apassword,bcrypt.genSaltSync(5),null)
} //Admindata


const patient=mongoose.Schema({
    Pname:{
        type:String,
        required:true
    },
    Pemail:{
        type:String,
        required:true
    },
    Ppassword:{
        type:String,
        required:true
    },
    PID:{
        type:String,
        required:true
    },
    
    Pphone:{
        type:String,
        required:true
    },
    Psex:{
        type:String,
        required:true
    },
    Page:{
        type:Number,
        required:true
    }

})
patient.methods.hashpassword=function(Ppassword){
    return bcrypt.hashSync(Ppassword,bcrypt.genSaltSync(5),null)
} //Admindata
const doctor =mongoose.Schema({
    Dname:{
        type:String,
        required:true
    },
    Demail:{
        type:String,
        required:true
    },
    Dpassword:{
        type:String,
        required:true
    },
    DSalary:{
        type:Number,
        required:true
    },
    
    Dphone:{
        type:String,
        required:true
    },
    Dsex:{
        type:String,
        required:true
    },
    Daddress:{
        type:String,
        required:true
    },
    Dage:{
        type:Number,
        required:true
    },
    dep_id:{
        type:String,
        required:true
    },
    Specialization:{
        type:String,
        required:true
    }


})


doctor.methods.hashpassword=function(Dpassword){
    return bcrypt.hashSync(Dpassword,bcrypt.genSaltSync(5),null)
} //Admindata

const Nurse =mongoose.Schema({
    Nname:{
        type:String,
        required:true
    },
    Nemail:{
        type:String,
        required:true
    },
  
    NID:{
        type:String,
        required:true
    },
    
   Nphone:{
        type:String,
        required:true
    },
    Nsex:{
        type:String,
        required:true
    },
    Naddress:{
        type:String,
        required:true
    },
    Nage:{
        type:Number,
        required:true
    },
    doctor_id:{
        type:String,
        required:true
    },
    


})
admin_data=mongoose.model('Admin',admin)
patient_data=mongoose.model('patient',patient)
doctor_data=mongoose.model('doctor',doctor)
nurse_data=mongoose.model('Nurse',Nurse)

module.exports={admin_data:admin_data,patient_data:patient_data,doctor_data:doctor_data,nurse_data:nurse_data}
