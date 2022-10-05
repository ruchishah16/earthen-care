const API_KEY = "AIzaSyB0GNJEcSqRStWF6NNuuy7l5lVlJvlq048";

// function validatedate(dateString){      
//     let dateformat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;      
          
//     // Match the date format through regular expression      
//     if(dateString.match(dateformat)){      
//         let operator = dateString.split('/');      
      
//         // Extract the string into month, date and year      
//         let datepart = [];      
//         if (operator.length>1){      
//             pdatepart = dateString.split('/');      
//         }      
//         let day= parseInt(datepart[0]);      
//         let month = parseInt(datepart[1]);      
//         let year = parseInt(datepart[2]);      
              
//         // Create list of days of a month      
//         let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
//         if (month==1 || month>2){      
//             if (day>ListofDays[month-1]){      
//                 ///This check is for Confirming that the date is not out of its range      
//                 return false;      
//             }      
//         }else if (month==2){      
//             let leapYear = false;      
//             if ( (!(year % 4) && year % 100) || !(year % 400)) {      
//                 leapYear = true;      
//             }      
//             if ((leapYear == false) && (day>=29)){      
//                 return false;      
//             }else      
//             if ((leapYear==true) && (day>29)){      
//                 console.log('Invalid date format!');      
//                 return false;      
//             }      
//         }      
//     }else{      
//         console.log("Invalid date format!");      
//         return false;      
//     }      
//     return true;      
// }
 

document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

function sendMail(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    var body = 'Hello '+name+',\nThank You for using EarthenCare Services. We will get back to you soon.'
    Email.send({
        SecureToken : "a667d7aa-ea8f-40af-9330-20b4125fd29c",
        To : email,
        From : "earthencare1@gmail.com",
        Subject : "Appoimtment Booked",
        Body : body
    }).then( message =>{
        if(message=='OK'){
            alert('Kindly Check your Mail. Thank you for using EarthenCare.');
        }
        else{
            console.error (message);
            alert('There is error at sending message. ') 
        }
    });
}


function login(){
    let emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    let emailPattern2 = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+\.[A-Za-z]+$/);
    let emailPattern3 = new RegExp(/^[a-zA-Z0-9]+\.+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/);
    // let datePattern = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/);

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const dept = document.getElementById("department").value;
    const doc = document.getElementById("doctor").value;
    console.log(name,email,phone,date,dept,doc);
    if(email && name && phone && dept!="no" && doc!="no" && date && phone.length===10 && (emailPattern.test(email) || emailPattern2.test(email)|| emailPattern3.test(email))){
        document.getElementById("error").innerHTML = "Loading..."
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                if (result.credential) {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;
                    var token = credential.accessToken;
                }
                var user = result.user;
                // console.log(user);
                sendMail();
                document.getElementById("error").innerHTML = "Your appointment request has been sent successfully. Thank you!"
            }).catch((error)=>{
                document.getElementById("error").innerHTML = error.message
            });
    }else if(!name){
        document.getElementById("error").innerHTML = "Please enter your name."
    }else if(!email || !(emailPattern.test(email) || emailPattern2.test(email)|| emailPattern3.test(email))){
        document.getElementById("error").innerHTML = "Please enter a valid email."
    }else if(!phone || phone.length != 10){
        document.getElementById("error").innerHTML = "Please enter a 10 digit valid phone number."
    }else if(dept === "no"){
        document.getElementById("error").innerHTML = "Please select a Service."
    }else if(doc === "no"){
        document.getElementById("error").innerHTML = "Please select a Doctor."
    }else if(!date){
        document.getElementById("error").innerHTML = "You cannot choose the same day or a past date."
    }else{
        document.getElementById("error").innerHTML = "Invalid Details"
    }
}

// function signUp(){
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .catch((error) => {
//         document.getElementById("error").innerHTML = error.message
//     });
// }