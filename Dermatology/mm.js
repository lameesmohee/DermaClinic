const data2=require("./model.db/APPointmentsandprescriptions")
const human=require("./model.db/human")

const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });

  const prescription=data2.prescription_data
  const patient=human.patient_data
  
  prescription.aggregate([
    {  $lookup:{
               from:'patients',
               localField:'pat_id',
               foreignField:"PID",
               as:"patient_perc"
   
           }},
           //{   $unwind:"$patient_perc" },


      // {$match:{'patient_perc':{$elemMatch:{Pname:'Ahmed Hassan'}}} }
        {$match:{'patient_perc.Pname':"Ahmed Hassan"}}

    

],(err,docs)=>{
    if(err)
    console.log(err)
    else{
        console.log(docs)
        console.log(docs[0].patient_perc[0].Pname)
        
        

        

    }
}
)