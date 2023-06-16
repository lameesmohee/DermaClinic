
var home = document.getElementById("home");
var Services = document.getElementById("Services");
var Doctors = document.getElementById("Doctors");
var Contact = document.getElementById("Contact");
var about = document.getElementById("About");
home.onclick = function () {
    home.setAttribute("Class", "active");
    Services.setAttribute("Class", "");
    Doctors.setAttribute("Class", "");
    Contact.setAttribute("Class", "");
    about.setAttribute("Class", "");

}

Services.onclick = function () {
    home.setAttribute("Class", "");
    Services.setAttribute("Class", "active");
    Doctors.setAttribute("Class", "");
    Contact.setAttribute("Class", "");
    about.setAttribute("Class", "");

}

Doctors.onclick = function () {
    home.setAttribute("Class", "");
    Services.setAttribute("Class", "");
    Doctors.setAttribute("Class", "active");
    Contact.setAttribute("Class", "");
    about.setAttribute("Class", "");

}

Contact.onclick = function () {
    home.setAttribute("Class", "");
    Services.setAttribute("Class", "");
    Contact.setAttribute("Class", "active");
    Doctors.setAttribute("Class", "");
    about.setAttribute("Class", "");

}
about.onclick = function () {
    home.setAttribute("Class", "");
    Services.setAttribute("Class", "");
    Contact.setAttribute("Class", "");
    Doctors.setAttribute("Class", "");
    about.setAttribute("Class", "active");
}

document.addEventListener("DOMContentLoaded", function() {
    var home1 = document.getElementById("home1");
    var Services1 = document.getElementById("Services1");
    var Doctors1 = document.getElementById("Doctors1");
    var Contact1 = document.getElementById("Contact1");
    var about1 = document.getElementById("About1");
  
    home.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("home1").scrollIntoView({ behavior: "smooth" , block: "start"});
      // window.scrollBy(0, -70); 

    });
  
    Services.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("Services1").scrollIntoView({ behavior: "smooth" , block: "start"});
      // window.scrollBy(0, -70); 
      console.log("Hahahaha")

    });
  
    Doctors.addEventListener("click", function(event) {
      event.preventDefault();
      window.scrollBy(0, -100); 
      document.getElementById("Doctors1").scrollIntoView({ behavior: "smooth" , block: "start"});

    });
  
    Contact.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("Contact1").scrollIntoView({ behavior: "smooth" , block: "start"});
      // window.scrollBy(0, -70); 

    });
  
    about.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("About1").scrollIntoView({ behavior: "smooth" , block: "start"});
      // window.scrollBy(0, -70); 

    });
  });