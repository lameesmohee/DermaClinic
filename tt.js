const data2=require("./model.db/APPointmentsandprescriptions")
const human=require("./model.db/human")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });

  const admin=human.admin_data
  const doctor=human.doctor_data
  const appointment=data2.appointment_data
  const times=data2.times_data
  appointment.collection.insertMany([
    {
        fees: 100,
        doc_id: "D001",
        pat_id: "648b84d96e67cbc991abb207",
        Time: 
          {
            start: "2023-06-16T09:00:00",
            end: "2023-06-16T09:30:00"
          }
          
        
      },
      {
        fees: 80,
        doc_id: "D001",
        pat_id: "648b84d96e67cbc991abb208",
        Time: 
          {
            start: "2023-06-16T10:00:00",
            end: "2023-06-16T10:30:00"
          },
          
      },
     
])

times.collection.insertMany([
    {
        doc_id: "D001",
      
        slots: [
          {
            start: "2023-06-16T09:00:00",
            end: "2023-06-16T09:30:00",
            status: "invalid"
          },
          {
            start: "2023-06-16T10:00:00",
            end: "2023-06-16T10:30:00",
            status: "invalid"
          },
          {
            start: "2023-06-16T11:00:00",
            end: "2023-06-16T11:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T09:00:00",
            end: "2023-06-17T09:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T10:00:00",
            end: "2023-06-17T10:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T11:00:00",
            end: "2023-06-17T11:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T12:00:00",
            end: "2023-06-17T12:30:00",
            status: "valid"
          }
        ],
        NumofReservations:2
      },
      {
        doc_id: "D002",
        
        slots: [
          {
            start: "2023-06-16T14:00:00",
            end: "2023-06-16T14:30:00",
            status: "valid"
          },
          {
            start: "2023-06-16T15:00:00",
            end: "2023-06-16T15:30:00",
            status: "valid"
          },
          {
            start: "2023-06-16T16:00:00",
            end: "2023-06-16T16:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T14:00:00",
            end: "2023-06-17T14:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T15:00:00",
            end: "2023-06-17T15:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T16:00:00",
            end: "2023-06-17T16:30:00",
            status: "valid"
          },
          {
            start: "2023-06-17T17:00:00",
            end: "2023-06-17T17:30:00",
            status: "valid"
          }
        ],
        NumofReservations:0
      }
    

])
admin.collection.insertMany(
  [
    {
      Aname: "Ahmed Ali",
      Aemail: "ahmed@gmail.com",
      Apassword: hashing("12345"),
      Aphone: "0123658090",
      ASalary: 5000,
      Aaddress:"Cairo, Egypt",
      Asex: "Male",
      Aage: 35
      
     
    
    },
    {
      Aname: "Sarah Ahmed",
        Aemail: "sarah@gmail.com",
        Apassword: hashing("56899"),
        Aphone: "01290804506",
        ASalary: 6000,
        Aaddress:"Luxor, Egypt",
        Asex: "Female",
        Aage: 28
    
    },
    {
      Aname: "MohammedHassan",
      Aemail: "mohammed@gmail.com",
      Apassword: hashing("69280"),
      Aphone: "01290804511",
      ASalary: 5500,
      Aaddress:"Luxor, Egypt",
      Asex: "Male",
      Aage: 42
    
    }
  ]

)

doctor.collection.insertMany([
  {
    Dname: "Dr. Kris Adam",
    Demail: "kris@example.com",
    Dpassword: hashing("jfdjkvjkds"),
    DSalary: 6000,
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
    DSalary: 6000,
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
    DSalary: 7000,
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
    DSalary: 7000,
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
    DSalary: 5500,
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
    DSalary: 5500,
    Dphone: "0123456784",
    Dsex: "Female",
    Daddress: "Hurghada, Egypt",
    Dage: 37,
    dep_id: "Dep001",
    Specialization: "Ph.D. in Skin Pharmacology"
  },
  {
    Dname: "Dr. Omar Ibrahim",
    Demail: "omar@example.com",
    Dpassword: hashing("password7"),
    DSalary: 5500,
    Dphone: "0123456783",
    Dsex: "male",
    Daddress: "Luxor, Egypt",
    Dage: 42,
    dep_id: "Dep003",
    Specialization: "Ph.D. in Experimental Dermatology"
  },
  {
    Dname: "Dr. Ali Ahmed",
    Demail: "ali@example.com",
    Dpassword: hashing("password8"),
    DSalary: 4500,
    Dphone: "0123456784",
    Dsex: "male",
    Daddress: "Hurghada, Egypt",
    Dage: 37,
    dep_id: "Dep003",
    Specialization: "Ph.D. in Skin Pharmacology"
  }



])


function hashing(pass){
  return bcrypt.hashSync(pass,bcrypt.genSaltSync(5),null)
}