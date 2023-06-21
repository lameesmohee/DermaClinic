const mongoose=require("mongoose")
const appointment=mongoose.Schema({
   fees:{
        type:Number,
        required:true
    },
    
   
   
   doc_id:{
        type:Object,
        required:true
    },
    pat_id:{
        type:Object,
        required:true
    },
    Time:{
        type:{ 
            Day:String,
            start:String,
          
            end:String

        },
        required:true
    }
   
  

})
const prescriptions=mongoose.Schema({
   Dosage:{
         type:String,
         required:true
     },
     
    
    Nameofmedicine:{
         type:String,
         required:true
     },
    doc_id:{
         type:Object,
         required:true
     },
     pat_id:{
         type:Object,
         required:true
     },
     contraindications:{
         type:String,
         required:true
     }
    
   
 
 })
 const times=mongoose.Schema({
    NumofReservations:{
         type:Number,
         required:true
     },
    doc_id:{
         type:Object,
         required:true
    },
   
     slots:{
         type:[{
            Day:String,
            start:String,
            end:String,
            Status:String,
            doc_id1:String

         }],
         required:true
     }
    
   
 
 })


appointment_data=mongoose.model('appoinment',appointment)
prescription_data=mongoose.model('prescription', prescriptions)
times_data=mongoose.model('times',times)
module.exports={
appointment_data:appointment_data,
prescription_data:prescription_data,
times_data:times_data
}