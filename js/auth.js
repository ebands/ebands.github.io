// variable de entorno, debe ser agregada para la conexión
var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
  };  
  
    firebase.initializeApp(config);

var url = "login.html";    
$(function(){ 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {    
      user = firebase.auth().currentUser;      
    } else {
       $(location).attr('href',url);   
    }
  });
});
