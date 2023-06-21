const data1=require("../model.db/departmentanddevices")
const data2=require("../model.db/APPointmentsandprescriptions")

const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });

const department=data1.dep_data
const device=data1.device_data
const appointment=data2.appointment_data
const prescription=data2.prescription_data
const times=data2.times_data

appointment.collection.insertMany([
    {
        fees: 100,
        doc_id: "D001",
        pat_id: "P001",
        Time: 
          {
            start: "2023-06-16T09:00:00",
            end: "2023-06-16T09:30:00"
          }
          
        
      },
      {
        fees: 80,
        doc_id: "D001",
        pat_id: "P002",
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
        Num:2
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
        Num:0
      }
    

])
prescription.collection.insertMany([

    {
        Dosage: "2 tablets daily",
        Nameofmedicine: "Medicine A",
        doc_id: "D001",
        pat_id: "P001",
        contraindictions: "Allergy to the active ingredient"
      },
      {
        Dosage: "1 cream application twice a day",
        Nameofmedicine: "Medicine B",
        doc_id: "D001",
        pat_id: "P002",
        contraindictions: "None"
      }
]
)

department.collection.insertMany([
  {
    DPname: "Dermatology Department",
    DPID: "DP001",
    Dplocation: {
      floor: 2,
      street: "Main Street"
    },
    doctor_id: ["D001", "D002", "D003"]
  },
  {
    DPname: "Cosmetic Dermatology Department",
    DPID: "DP002",
    Dplocation: {
      floor: 3,
      street: "Second Avenue"
    },
    doctor_id: ["D004", "D005"]
  },
  {
    DPname: "Pediatric Dermatology Department",
    DPID: "DP003",
   Dplocation: {
      floor: 1,
      street: "Broadway"
    },
    doctor_id: ["D006", "D007", "D008"]
  }
]
)

device.collection.insertMany([
  {
    Code: "DEV001",
    PPM: 200,
    Manufacturer: "ABC Corporation",
    dep_id: "DP001"
  },
  {
    Code: "DEV002",
    PPM: 150,
    Manufacturer: "XYZ Industries",
    dep_id: "DP001"
  },
  {
    Code: "DEV003",
    PPM: 180,
    Manufacturer: "DEF Healthcare",
    dep_id: "DP002"
  },
  {
    Code: "DEV004",
    PPM: 220,
    Manufacturer: "GHI MedTech",
    dep_id: "DP002"
  },
  {
    Code: "DEV005",
    PPM: 190,
    Manufacturer: "JKL Solutions",
    dep_id: "DP003"
  }
]
)


