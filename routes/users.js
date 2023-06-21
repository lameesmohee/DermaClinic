var express = require('express');
var router = express.Router();
const {check,validationResult} =require('express-validator')
/* GET users listing. */
const passport=require("passport")
const users_data=require("../model.db/human")
const data1=require("../model.db/APPointmentsandprescriptions")
const patient_data=users_data.patient_data
const doctor_data=users_data.doctor_data
const admin_data=users_data.admin_data
const data2=require("../model.db/departmentanddevices");
const { default: mongoose } = require('mongoose');
const dep_data =data2.dep_data
const time=data1.times_data
// router.get('/profilepatient', function(req, res, next) {
//   console.log("lklklkllk")
//   patient_data.find({_id:req.session.passport.user[0]._id},(err,docs)=>{
//     if(err)
//     {
//       console.log(err)
//     }
//     else
//     {
   
//       res.render("users/patient",{datap:docs})

//     }
//   })
  
// });
var role;









router.get("/profile",isSignin,(req,res,next)=>{
  console.log(req.session.passport.user[0]._id)
  console.log(role)
  
  
  if(role==="patient")
  {
    patient_data.find({_id:req.session.passport.user[0]._id},(err,docs)=>{
      if(err)
      {
        console.log(err)
      }
      else
      {
        res.render("users/patient",{datap:docs})

      }
    })
    

  }
  else{
    if(role==="doctor")
  {
    doctor_data.find({_id:req.session.passport.user[0]._id},(err,docs)=>{
      if(err)
      {
        console.log(err)
      }
      else
      {
        res.render("users/doctor",{datad:docs})

      }
    })
    
  }
  else{
   admin_data.find({_id:req.session.passport.user[0]._id},(err,docs)=>{
      if(err)
      {
        console.log(err)
      }
      else
      {
        res.render("users/admin",{dataa:docs})

      }
    })
    
    

  }
 

  }
  
 
})

router.get('/signup',(req,res,next)=>{
  var messages_signup=req.flash('errsignup')
  console.log(messages_signup)
  res.render('users/signup',{  messages1:messages_signup ,style:"/stylesheets/signup.css"})
})

router.get('/signin',(req,res,next)=>{
  var messages_signin=req.flash('errsignin')
  console.log(messages_signin)
  res.render('users/signin',{messages:messages_signin,style:"/stylesheets/login.css"})
})

router.post('/profilesignup',[
  check("email").not().isEmpty().withMessage("Please Enter your Email"),
  check("number").not().isEmpty().withMessage("Please Enter your Mobilephone"),
  check("email").isEmail().withMessage("Please Enter your Email Correctly"),
  check("number").isMobilePhone().withMessage("Please Enter your Mobilephone Correctly"),
  check('password').isLength({ min: 5 }).withMessage('Please enter Password correctly'),
  check("confirm_password").custom((value ,{req})=>{
    if(value!==req.body.password)
    {
      throw new Error ('Passwoord and Confirm-Password Do not Match')
    }
    else{
      return true
    }

  })
],(req,res,next)=>{
  var validationerr2=[]
  const errors=validationResult(req)
  if(!errors.isEmpty())
  {
    arr1=errors.errors
  for(i=0;i<arr1?.length;i++)
  {
    validationerr2.push(arr1[i].msg)
  }
  req.flash("errsignup",validationerr2)
  res.redirect('signup')
  return

  }
  next()
  



},
passport.authenticate("local_signup",{
  session:false,
  
  successRedirect:"signin",
  failureRedirect:'signup',
  failureFlash:true
}


))


router.get('/logout',(req,res,next)=>{
  req.logOut((err)=>
  {
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/')

    }
  }
  );
  
})
router.get("/editpatient",(req,res,next)=>{
  var mes=req.flash("editpatient")
  var patient_id=req.session.passport.user[0]._id
  res.render("users/editpatient",{messages:mes,patient_id:patient_id})
})
router.get("/editdoctor",(req,res,next)=>{
  var mes=req.flash("editdoctor")
  var doctor_id=req.session.passport.user[0]._id
  doctor_data.find({_id:doctor_id},(err,docs)=>{
    console.log("uuuuuuu")
    if(err)
    
    { console.log(err)} 
    
    else{
      console.log(docs)
      res.render("users/editdoctor",{messages:mes,doctor_id:doctor_id,dep_id:docs[0].dep_id,spec:docs[0].Specialization})
    }

    

  
  })
 
})


router.post("/editp",[
  check("email").isEmpty().withMessage("Notempty"),
  check("email").isEmail().withMessage("Please Enter your Email correctly"),
  check("name").isEmpty().withMessage("Notempty"),
  check("number").isEmpty().withMessage("Notempty"),
  check("number").isMobilePhone().withMessage("Please Enter your Mobilephone correctly"),

  check("age").isEmpty().withMessage("Notempty")


],(req,res,next)=>{
  var err=validationResult(req)
  if(!err.isEmpty()){
    console.log(err.errors)
    var x=[]
    var y=[]
    var arr2=err.errors

    for(i=0;i<arr2?.length;i++)
    {
      console.log("lamaaa")
      if(arr2[i].msg==="Notempty")
      {
         y.push(arr2[i].path)
     
      

        }
        else{
          
          if(arr2[i].value===null || arr2[i].value===null)
          {
            x.push(arr2[i].msg)
          }
          
        }

      
      
      }

      console.log(y?.length)
      console.log(y[0])
      for(j=0;j<y?.length;j++)
      {
       
        if(y[j]==="email")
        {
          patient_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Pemail:req.body.email}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
        }  
        else{
          if(y[j]==="name")
        {
          patient_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Pname:req.body.name}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
        
        }  
        else{
          if(y[j]==="age")
        {
          console.log("kkkkkkk")
          patient_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Page:req.body.age}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
          
        }  
        else{
          
          patient_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Pphone:req.body.number}},(err,docs)=>{
            if(err)
             {
              
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()    
        }

        }
        }  

      }

    
    
      if(x?.length!==0){
       
        req.flash("editpatient",x)
        res.redirect("editpatient")

      }
      else{
        console.log("jbbbkbj,")
        res.redirect("profile")
      }
      



    }

  }
)


  
router.post("/editd",[
  check("email").isEmpty().withMessage("Notempty"),
  check("email").isEmail().withMessage("Please Enter your Email correctly"),
  check("name").isEmpty().withMessage("Notempty"),
  check("number").isEmpty().withMessage("Notempty"),
  check("number").isMobilePhone().withMessage("Please Enter your Mobilephone correctly"),

  check("age").isEmpty().withMessage("Notempty"),
  check("address").isEmpty().withMessage("Notempty")



],(req,res,next)=>{
  var err=validationResult(req)
  if(!err.isEmpty()){
    console.log(err.errors)
    var x=[]
    var y=[]
    var arr2=err.errors

    for(i=0;i<arr2?.length;i++)
    {
      console.log("lamaaa")
      if(arr2[i].msg==="Notempty")
      {
         y.push(arr2[i].path)
     
      

        }
        else{
          
          if(arr2[i].value==="undefined" || arr2[i].value===null)
          {
            x.push(arr2[i].msg)
          }
        }

      
      
      }

      console.log(y?.length)
      console.log(y[0])
      for(j=0;j<y?.length;j++)
      {
       
        if(y[j]==="email")
        {
         doctor_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Demail:req.body.email}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
        }  
        else{
          if(y[j]==="name")
        {
          doctor_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Dname:req.body.name}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
        
        }  
        else{
          if(y[j]==="age")
        {
          console.log("kkkkkkk")
          doctor_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Dage:req.body.age}},(err,docs)=>{
            if(err)
             {
              console.log("ggggg")
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()
          
        }  
        else{
          if(y[j]==="number")
          {
                
          doctor_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Dphone:req.body.number}},(err,docs)=>{
            if(err)
             {
              
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()    

          }
          else{
                
          doctor_data.updateOne({_id:req.session.passport.user[0]._id},{$set:{Daddress:req.body.address}},(err,docs)=>{
            if(err)
             {
              
               console.log(err)
             }
             else{
              console.log(docs)
              
             }
            }
          )
          next()    
          }

      
        }

        }
        }  

      }

    
    
      if(x?.length!==0){
       
        req.flash("editdoctor",x)
        res.redirect("editdoctor")

      }
      else{
        console.log("jbbbkbj,")
        res.redirect("profile")
      }
      



    }

  }
)


router.get("/adddoc",(req,res,next)=>{
  var msg=req.flash("erradddoctor")
  res.render("users/adddoctor",{msg:msg})


})

router.post("/adddoctor", [
check("email").not().isEmpty().withMessage("Please Enter  Email"),
check("number").not().isEmpty().withMessage("Please Enter  Mobilephone"),
check("spec").not().isEmpty().withMessage("Please Enter  Specialization"),
check("dep_id").not().isEmpty().withMessage("Please Enter  Mobilephone"),
check("email").isEmail().withMessage("Please Enter  Email Correctly"),
check("age").not().isEmpty().withMessage("Please Enter  Age"),
check("address").not().isEmpty().withMessage("Please Enter  Address"),
check("number").isMobilePhone().withMessage("Please Enter Phone Number Correctly"),
check('password').isLength({ min: 5 }).withMessage('Please enter Password correctly'),
check("confirmpassword").custom((value ,{req})=>{
  if(value!==req.body.password)
  {
    throw new Error ('Password and Confirm-Password Do not Match')
  }
  else{
    return true
  }

})
],(req,res,next)=>{
  var validationerr2=[]
  const errors=validationResult(req)
  if(!errors.isEmpty())
  {
    arr1=errors.errors
  for(i=0;i<arr1?.length;i++)
  {
    validationerr2.push(arr1[i].msg)
  }
  req.flash("erradddoctor",validationerr2)
  res.redirect('adddoc')
  return

  }
  else{
    doctor_data.find({Demail:req.body.email},(err,docss)=>{
      if(err)
      console.log(err)
      else{
        if(Object.keys(docss).length!==0)
        {
          req.flash("erradddoctor","This Email already Exists")
          res.redirect("adddoc")
        }
        else{
          doctor_data.collection.insert({
            Dname:req.body.name,
            Specialization:req.body.spec,
            dep_id:req.body.dep_id,
            Demail:req.body.email,
            Dpassword:doctor_data().hashpassword(req.body.password)
            ,Dphone:req.body.number,
            Dage:req.body.age,
            Daddress:req.body.address
          
          
          
          },(err,docs)=>{
            if(err)
            {
              console.log(err)
            }
            else{
              console.log(docs)
              console.log(docs.insertedIds[0])
            
             
              dep_data.update({DPID:req.body.dep_id},{$push:{doctor_id:docs.insertedIds[0]}},(err,result)=>{
                if(err)
                {
                  console.log(err)
                }
                else{
                  console.log(result)
                  res.redirect("profile")
                }
      
              })
              
          
          
            }
          })
      
        }
      

        
      }
    })
    
   
  }



}


)
router.get("/workhour",(req,res,next)=>{
  var id=mongoose.Types.ObjectId(req.session.passport.user[0]._id)
  console.log(req.session.passport.user[0]._id)
  console.log(id)
  time.find({doc_id:id},(err,docs)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      console.log(docs)
      res.render("users/timedoc",{data:docs})
    }
  })
  
})
 
 
 router.get("/addworktime/:id",(req,res,next)=>{
 console.log(req.params.id)
  console.log(req.body.time1)
  console.log(req.body.time2)
 console.log("jjjjj")

  res.redirect("/addworkhour")
 })

 




router.post('/profilesignin',[
  check('email').not().isEmpty().withMessage("Please Enter your Email"),
  check('email').isEmail().withMessage("Please Enter your Email correctly"),
  check('password').isLength({min:5}).withMessage("Please Enter your Password correctly")

],(req,res,next)=>{

  role=req.body.role
  

  var validationerr=[]
  const errs=validationResult(req)
  if(!errs.isEmpty()){
    var arr =errs.errors
    for( i=0; i < arr?.length;i++)
    {
      validationerr.push(arr[i].msg)

    }
    console.log(validationerr)
    req.flash('errsignin',validationerr)
    
    res.redirect("signin")
    return;
  }
 next()




},
passport.authenticate('local_signin',{

 
  successRedirect:'profile',
  failureRedirect:'signin',
  failureFlash:true
  
},



)
)


function isSignin(req,res,next){
  if( !req.isAuthenticated())
  {
    res.redirect('signin')
  }
  else
  {
    next();
  }
}




module.exports = router;
