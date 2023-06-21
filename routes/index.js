var express = require('express');
var router = express.Router();
const passport=require("passport")
var mongoose = require('mongoose');

const users_data=require("../model.db/human")
const patient_data=users_data.patient_data
const doctor_data=users_data.doctor_data
const admin_data=users_data.admin_data
const other_data=require("../model.db/APPointmentsandprescriptions")
const prescription_data=other_data.prescription_data
const data2=require("../model.db/departmentanddevices")
const dep_data =data2.dep_data
const device=data2.device_data
const time= other_data.times_data
/* GET home page. */
var dep;
var data1;
var name;
var id;
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get("/addworkhour",(req,res,next)=>{
  res.render("users/addworkhour")
})

router.get("/appointment",(req,res,next)=>{
  res.render("appointment")
})

router.post("/appoint",(req,res,next)=>{
  console.log(req.body.department)
  dep=req.body.department
  console.log("lllllll")

  
  res.redirect("getdata")
})


router.get("/getdata",(req,res,next)=>{
  console.log(dep)

  dep_data.aggregate([{
    $lookup:{
      from:"doctors",
      localField:"doctor_id",
      foreignField:"_id",
      as:"data"
    }
    
  },{
    $match:{"DPname":dep}
  }],(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
       data1=docs[0].data
       console.log(data1)
       set1=[]
       set2=[]
       for(j=0;j<Object.keys(data1).length;j++)
       {
       // console.log(data1[j].Dname)
    
        set1.push(data1[j]._id)
        set2.push(data1[j].Dname)
        

       

       }
       console.log(set1)
      
        

        time.find({$and:[{doc_id:{$in:set1}},{slots:{$elemMatch:{Status: "valid"}}}]},(err,docs1)=>{
          if(err)
          {
            console.log(err)
          }
          else{
            console.log(docs1)
           // console.log(docs1.slots)
         //   Array.prototype.push.apply(set2,docs1);
            console.log("lllllll")
            //console.log(set2)
          //  console.log(docs1[0].slots.doc_id)
          //co
           
           
              res.render("appointment",{data2:docs1})

           
          
          }
        })
         

     


     
      
   

    


    
  
    }
  }
  
  )
 
  
  
 

})


router.get("/addappointment/:id/:day/:start",(req,res,next)=>{
  var doc_id=mongoose.Types.ObjectId(req.params.id)
  time.updateOne({$and:[{doc_id:doc_id},{"slots.$.start":req.params.start}]},{$push:{'slots.$.Status':"invalid"}},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      //console.log(req.session.passport.user[0]._id)
      res.redirect("/users/profile")
    }
  })
  
})






router.post("/getdata2",(req,res,next)=>{
  name=req.query.Doctors
  console.log(req.query.Doctors)
  doctor_data.find({Dname:req.query.Doctors},(err,docs1)=>{
    if(err)
    {
      console.log(err)

    }
    else{
      console.log(docs1[0]._id)
      id=docs1[0]._id
    
    }
  })
  time.find({doc_id:id},(err,docs3)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs3)
      res.render("appointment",{data2:docs3})
    }
  })



})








router.get("/homeaftersignin",(req,res,err)=>{
  res.render("homeaftersignin")
})
router.get("/prescription",(req,res,next)=>{
  var id = mongoose.Types.ObjectId(req.session.passport.user[0]._id)
  
 patient_data.aggregate([{

  
  
    $lookup:{
      from:"prescriptions",
      localField:"_id",
      foreignField:"pat_id",
      as :"patient_prec"

    },
   
  },
  {
    $match:
    {"_id":id}
  }
],
  (err,docs)=>{
    if(err){
      console.log(err)
    }
    else{
    // var x=docs[0].patient_prec
    // console.log(docs)
    // console.log(typeof(id))
     if(Object.keys(docs).length===0)
     {
      res.render("patientprescription",{message:"NO Prescription have been prescribed"})
     }
     else{
      var x=docs[0].patient_prec
      res.render("patientprescription",{data:x})

     }
     
   
  }
}
  )
})

router.get("/adddevice",(req,res,next)=>{
  var msg=req.flash("errdevice")
  res.render("adddevice",{msg:msg}) 
}

)
router.post("/adddev",(req,res,next)=>{
  dep_data.find({DPID:req.body.dep_id},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      if(Object.keys(docs).length===0){
        req.flash("errdevice","The Department ID Doesn't Exist ")
        res.redirect("adddevice")
      }
      else{
        device.find({Code:req.body.code},(err,docs1)=>{
          if(err)
          {
            console.log(err)
          }
          else{
            if(Object.keys(docs1).length!==0)
            {
              req.flash("errdevice","The Code already Exists ,Choose Another Code ")
              res.redirect("adddevice")
            }
            else{
              device.collection.insertOne({
                Code:req.body.code,
                dep_id:req.body.dep_id,
                Manufacturer:req.body.manu,
                PPM:req.body.ppm}
                ,(err,docs2)=>{
                  if(err)
                  {
                    console.log(err)
                  }
                  else{
                    console.log(docs2)
                    res.redirect("users/profile")
                  }
                })
            }

           
          }
        })
      }

    }
  })

})


router.get("/addpre",(req,res,next)=>{
  res.render("addprescription",{msg:"This ID is not found"})
})

router.post("/addpres",(req,res,next)=>{
  var pat_id=mongoose.Types.ObjectId(req.body.pat_id)
  var doc_id=mongoose.Types.ObjectId(req.session.passport.user[0]._id)
  console.log("vvvvvvvvvvvvvv")
  console.log(typeof(pat_id))
  console.log(req.session.passport.user[0]._id)
  patient_data.find({_id:pat_id},(err,result)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      if(Object.keys(result).length===0)
      {
        console.log("aaaaaaaa")
        res.redirect('addpre')
      }
      else{
        
  prescription_data.collection.insertOne({
    pat_id:pat_id,
    Dosage:req.body.dosage,
    Nameofmedicine:req.body.name,
    doc_id:doc_id, 
    contraindications:req.body.cont
  
  
  },(err,docs)=>{
    if(err)
    {
      console.log(err)

    }
    else{
      console.log("bbbbbbbbbb")
      console.log(docs)
      res.redirect("users/profile")
    }
  })
       
      }
    }
  }
  
  )

})
router.get("/addp",(req,res,next)=>{
  res.render("addprescription")
})

router.get("/showpatient",(req,res,next)=>{
  patient_data.find({},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      res.render("showpatient",{data:docs})
    }
  })

})

router.get("/showdoctor",(req,res,next)=>{
 doctor_data.find({},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      res.render("showdoctor",{data:docs})
    }
  })

})
router.get("/showdevice",(req,res,next)=>{
 device.find({},(err,docs)=>{
     if(err)
     {
       console.log(err)
     }
     else{
       console.log(docs)
       res.render("showdevice",{data:docs})
     }
   })
 
 })

 router.get("/deletecode/:id",(req,res,next)=>{

  device.deleteMany({Code:req.params.id},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      device.find({},(err,result)=>{
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.render("showdevice",{data:result})
        }
      })
     
    }
  }
  )


 })


router.get("/delete/:id",(req,res,next)=>{
  console.log("klklkllkk")
  console.log(req.params.id)
 //var did=mongoose.Types.ObjectId(req.params.id)
 // console.log(typrof(did))

  doctor_data.deleteMany({_id:req.params.id},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      doctor_data.find({},(err,docs1)=>{
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(docs1)
          dep_data.find({doc_id:req.params.id},(err,docs2)=>{
            if(err)
            {
              console.log(err)
            }
            else{
              console.log(docs2)
            }
            res.render("showdoctor",{data:docs1})

          })


         
        }
      }
      
      
      )
    
    
    }
  })


})




module.exports = router;
