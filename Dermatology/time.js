const data2=require("./model.db/APPointmentsandprescriptions")

const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/Dermatology',{useNewUrlParser:true}).then(res=>
{
 console.log("db is connected")
}).catch(error=>
  {
    console.log(error)
  });

  const times=data2.times_data
  const appointment=data2.appointment_data

  appointment.collection.insertMany([
    {
        fees: 100,
        doc_id: "649098ac2e11c27b416535a7",
        pat_id: "648b84d96e67cbc991abb208",
        Time: 
          {
            Day: "Sunday",
            start: "11:00",
            end: "12:00"
          }
          
        
      },
      {
        fees: 80,
        doc_id: "649098ac2e11c27b416535a7",
        pat_id: "648b84d96e67cbc991abb207",
        Time: 
          {
            Day: "Sunday",
            start: "09:00",
            end: "10:00"
          },
          
      },
     
])

  times.collection.insertMany([
  {  NumofReservations: 2,
    doc_id:'649098ac2e11c27b416535a7',
    slots: [
      {
        Day: "Sunday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Sunday",
       starttime: "11:00",
        endtime: "12:00"
      },
      {
        Day: "Monday",
        starttime: "2:00",
        endtime: "2:30"
      },
      {
        Day: "Monday",
        starttime: "3:00",
        endtime: "3:30"
      }
    ]
  }
  ,
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535a8',
    slots: [
      {
        Day: "Thursday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Thursday",
        start: "1:00",
        end: "1:30"
      },
      {
        Day: "Wednesday",
        start: "4:00",
        end: "4:30"
      },
      {
        Day: "Wednesday",
        starttime: "10:00",
        endtime: "10:30"
      }
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535a9',
    slots: [
      {
        Day: "Saturday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Saturday",
        start: "1:00",
        end: "1:30"
      }
      
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535aa',
    slots: [
      {
        Day: "Friday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Friday",
        start: "1:00",
        end: "1:30"
      }
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535ab',
    slots: [
      {
        Day: "Thuesday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Thuesday",
        start: "1:00",
        end: "1:30"
      }
     
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535ac',
    slots: [
      {
        Day: "Thuesday",
        start: "08:00",
        end: "8:30"
      },
      {
        Day: "Thuesday",
        start: "2:00",
        end: "2:30"
      }
     
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'649098ac2e11c27b416535ad',
    slots: [
      {
        Day: "Sunday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Sunday",
        start: "1:00",
        end: "1:30"
      }
    ]
  },
  {
    NumofReservations: 0,
    doc_id:'6490e0805ce75f03ece46778',
    slots: [
      {
        Day: "Thursday",
        start: "09:00",
        end: "10:00"
      },
      {
        Day: "Thursday",
        start: "1:00",
        end: "1:30"
      }
    ]
  }


  ])

