// variable de entorno, debe ser agregada para la conexión

var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
  };  

var btnRegistrar = $("#divBtnReg");
var defaultApp = firebase.initializeApp(config);
var fb = firebase.database().ref();
  // Initialize Firebase
 $(function(){     
    btnRegistrar.click(function() {
        addElement();
     });
 });


function addElement(){
    var nameInstrument =$("#tvName"); 
    var typeInstrument = $("#spTipOb");    
    console.log(nameInstrument.val(), typeInstrument.val()) 
    var postData = {
        nameInstrument:nameInstrument.val(),
        typeInstrument:typeInstrument.val()
    };  
    // Get a key for a new Post.
    var newPostKey = fb.child('inventario').push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/inventario/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return fb.update(updates);
  }