const human=require("../model.db/human")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });

const admin=human.admin_data
const doctor=human.doctor_data
const patient=human.patient_data
const Nurse=human.nurse_data


admin.collection.insertMany(
  [
    {
      Aname: "Ahmed Ali",
      Aemail: "ahmed@gmail.com",
      Apassword: hashing("12345"),
      AID: "1",
      ASalary: 5000,
      Asex: "Male",
      Aage: 35
      
     
    
    },
    {
      Aname: "Sarah Ahmed",
        Aemail: "sarah@gmail.com",
        Apassword: hashing("56899"),
        AID: "2",
        ASalary: 6000,
        Asex: "Female",
        Aage: 28
    
    },
    {
      Aname: "MohammedHassan",
      Aemail: "mohammed@gmail.com",
      Apassword: hashing("69280"),
      AID: "3",
      ASalary: 5500,
      Asex: "Male",
      Aage: 42
    
    }
  ]

)

patient.collection.insertMany([
  {
    Pname: "Ahmed Hassan",
    Pemail: "ahmed@gmail.com",
    Ppassword: hashing("password1"),
  
    Pphone: "0123456789",
    Psex: "Male",
    Page: 35
  },
  {
    Pname: "Fatma Mohmmed",
    Pemail: "fatma@gmail.com",
    Ppassword: hashing("password2"),
  
    Pphone: "0123456780",
    Psex: "female",
    Page: 28
  },

])

Nurse.collection.insertMany([
  {
    Nname: "Hala Mohamed",
    Nemail: "hala@gmail.com",
    NID: "N001",
    Nphone: "0123456789",
    Nsex: "Female",
    Nage: 28,
    Naddress: "Cairo, Egypt",
    doctor_id: "D001"
  },
  {
    Nname: "Ahmed Ibrahim",
    Nemail: "ahmed@gmail.com",
    NID: "N002",
    Nphone: "0123456780",
    Nsex: "Male",
    Nage: 32,
    Naddress: "Alexandria, Egypt",
    doctor_id: "D002"

  },
  {

    Nname: "Nadia Ali",
    Nemail: "nadia@gmail.com",
    NID: "N003",
    Nphone: "0123456781",
    Nsex: "Female",
    Nage: 25,
    Naddress: "Giza, Egypt",
    doctor_id: "D001"

  },
  {
    Nname: "Amira Hassan",
    Nemail: "amira@gmail.com",
    NID: "N004",
    Nphone: "0123456782",
    Nsex: "Female",
    Nage: 30,
    Naddress: "Aswan, Egypt",
    doctor_id: "D002"
  },
  {
    Nname: "Khaled Mahmoud",
    Nemail: "khaled@gmail.com",
    NID: "N005",
    Nphone: "0123456783",
    Nsex: "Male",
    Nage: 36,
    Naddress: "Luxor, Egypt",
    doctor_id: "D003"
  },
  {
    Nname: "Mona Ahmed",
    Nemail: "mona@gmail.com",
    NID: "N006",
    Nphone: "0123456784",
    Nsex: "Female",
    Nage: 27,
    Naddress: "Hurghada, Egypt",
    doctor_id: "D002"
  }

])

doctor.collection.insertMany([
  {
    Dname: "Dr. Kris Adam",
    Demail: "kris@example.com",
    Dpassword: hashing("jfdjkvjkds"),
    DID: "D001",
    Dphone: "0123456789",
    Dsex: "Male",
    Daddress: "Cairo, Egypt",
    Dage: 40,
    dep_id: "Dep001",
    Specialization: "Ph.D. in Cutaneous Biology and Regenerative Medicine"
  },
  {
    Dname: "Dr. Sofia",
    Demail: "sofia@example.com",
    Dpassword: hashing("5123650"),
    DID: "D002",
    Dphone: "0123456780",
    Dsex: "Female",
    Daddress: "Alexandria, Egypt",
    Dage: 35,
    dep_id: "Dep002",
    Specialization: "Ph.D. in Experimental Dermatology"
  },
  {
    Dname: "Dr. Jared Daniel",
    Demail: "jared@example.com",
    Dpassword: hashing("6752003"),
    DID: "D003",
    Dphone: "0123456781",
    Dsex: "Male",
    Daddress: "Giza, Egypt",
    Dage: 45,
    dep_id: "Dep001",
    Specialization: "Ph.D. in Dermatological Sciences "
  },
  {
    Dname: "Dr. Emma steeve",
    Demail: "emma,@example.com",
    Dpassword: hashing("71520000"),
    DID: "D004",
    Dphone: "0123456782",
    Dsex: "Female",
    Daddress: "Aswan, Egypt",
    Dage: 38,
    dep_id: "Dep002",
    Specialization: "Ph.D. in Dermatoepidemiology"
  },
  {
    Dname: "Dr. Lisa Martin",
    Demail: "lisa@example.com",
    Dpassword: hashing("password5"),
    DID: "D005",
    Dphone: "0123456783",
    Dsex: "female",
    Daddress: "Luxor, Egypt",
    Dage: 42,
    dep_id: "Dep003",
    Specialization: "Ph.D. in Experimental Dermatology"
  },
  {
    Dname: "Dr. Alexandra Reynolds",
    Demail: "alexandra@example.com",
    Dpassword: hashing("password6"),
    DID: "D006",
    Dphone: "0123456784",
    Dsex: "Female",
    Daddress: "Hurghada, Egypt",
    Dage: 37,
    dep_id: "Dep001",
    Specialization: "Ph.D. in Skin Pharmacology"
  }


])


function hashing(pass){
  return bcrypt.hashSync(pass,bcrypt.genSaltSync(5),null)
}