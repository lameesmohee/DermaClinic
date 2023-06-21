const passport = require("passport")
const localStragey=require("passport-local").Strategy
const bcrypt=require("bcrypt")
const users_data=require("../model.db/human")
const patient_data=users_data.patient_data
const doctor_data=users_data.doctor_data
const admin_data=users_data.admin_data


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
   
    user.findById(id,('email'), function(err, user) { // return email only 
        done(err, user);
    });
});


passport.use("local_signin",new localStragey(
    {
        usernameField:'email',
        passwordField:"password",
        passReqToCallback:true
        
    },
    (req,email,password,done)=>{
        console.log(req.body.role)
        if(req.body.role==="patient")
        {
            patient_data.find({Pemail:email},(err,docs)=>{
                if(err)
                return done(err)
                else{
                    console.log(docs)
                    if(Object.keys(docs).length===0)
                    {
                        
                        return done(null,false,req.flash("errsignin","This user is not found"))
                    }
                    else {
                        var isMatch=bcrypt.compareSync(password,docs[0].Ppassword)
                        if(!isMatch){
                            return done(null,false,req.flash("errsignin","A PASSWORD IS WRONG"))
                        }
                        else{
                            user=patient_data
                            return done(null,docs)
                        }

                    }
                }
    
            })
        
        }
        if(req.body.role==="admin")
        {
            
            admin_data.find({Aemail:email},(err,docs)=>{
                if(err)
                return done(err)
                else{
                   // console.log(email)
                    //console.log(docs)
                   
                    if(Object.keys(docs).length===0)
                    {
                        console.log("kkkkkkkk")
                        return done(null,false,req.flash("errsignin","This user is not found"))
                    }
                    else {
                        var isMatch=bcrypt.compareSync(password,docs[0].Apassword)
                        
                        if(!isMatch){
                            return done(null,false,req.flash("errsignin","A PASSWORD IS WRONG"))
                        }
                        else{
                            user=admin_data
                            role=req.body.role
                          
                            return done(null,docs,role)
                        }

                    }
                }
    
            })
        

        }
        if(req.body.role==="doctor")
        {
            doctor_data.find({Demail:email},(err,docs)=>{
                if(err)
                return done(err)
                else{
                    if(Object.keys(docs).length===0)
                    {
                        return done(null,false,req.flash("errsignin","This user is not found"))
                    }
                    else {
                        var isMatch=bcrypt.compareSync(password,docs[0].Dpassword)
                        if(!isMatch){
                            return done(null,false,req.flash("errsignin","A PASSWORD IS WRONG"))
                        }
                        else{
                            user=doctor_data

                            return done(null,docs)
                        }

                    }
                }
    
            })
        

        }

    }
))


passport.use("local_signup",new localStragey({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
},
(req,email,password,done)=>{
    patient_data.find({Pemail:email},(err,docs)=>{
        if(err)
         return done(err)
        else{
            if(Object.keys(docs).length!==0)
            {
                return done(null,false,req.flash("errsignup","Email already Exists"))
            }
            else{
                patient_data.collection.insert([{
                    Pname:req.body.name,
                    Pemail:email,
                    Ppassword:patient_data().hashpassword(password),
                    Pphone:req.body.number,
                    Psex:req.body.gender,
                   

                }],(err,docs)=>{
                    if(err){
                        return done(err)
                    }
                    else{
                        user=patient_data
                        return done(null,docs)
                    }
                })
            }

        }
      
    })

}
)
)
