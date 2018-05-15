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
  // var etEma = document.getElementById('rta');
   //var dbref = firebase.database().ref().child('txt');
   //dbref.on('value', snap => etEma.innerText = snap.val() );
   
var btnLogin = $("#btnLogin");
var etEmail = $("#inputEmail");
var etPass =  $("#inputPassword");

btnLogin.click(function() {
 // alert( "Handler for .click() called." );
 var mail = etEmail.val();
 var pass = etPass.val();
 console.log(mail,pass);
 loguerse(mail,pass);

});

function loguerse(user, pass){
		firebase.auth().signInWithEmailAndPassword(user, pass)
 .catch(function(error) {
   // Handle errors
   var errorCode = error.code;
   var errorSpn; 
      switch(errorCode) {
        case 'auth/wrong-password':
            errorSpn = "La Contraseña que estas ingresando es Incorrecta";
            break;
        case 'auth/invalid-email':
           errorSpn = "El Correo que esta ingresando es Invalido";
            break;
        case 'auth/user-not-found':
          errorSpn = "Este correo no esta registrado, por favor verifica el correo que estas ingresando";
          break;
        default:    
            errorSpn = error.message;
        
    }

      alert(errorSpn);
 });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Logueado");
    var url = "welcomeAdmin.html";    
		$(location).attr('href',url);
    //firebase.auth().signOut();
  } else {
    //  var url = "login.html"; 
     //$(location).attr('href',url);
    //console.log("no Logeado");
  }
});


