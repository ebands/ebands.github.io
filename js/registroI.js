// variable de entorno, debe ser agregada para la conexión

var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
};  

//////////////////////////
//VARIABLES
/////////////////////////

var btnRegistrar = $("#divBtnReg");
var defaultApp = firebase.initializeApp(config);
var nameInstrument =$("#tvName"); 
var typeInstrument = $("#spTipOb");    
var fb = firebase.database().ref();
  
//////////////////////////
//Metodos
/////////////////////////

/**Metodo de inialización del documento, comienza por aquí**/
 $(function(){     
    btnRegistrar.click(function() {
        addElement();       
     });
 });

/**Metodo que agrega un elemento al inventario en la base de datos**/
function addElement(){
    var postData = {
        nameInstrument:nameInstrument.val(),
        typeInstrument:typeInstrument.val()
    };  
    //Obtiene un nuevo key para realizar el Post.
    var newPostKey = fb.child('inventario').push().key;
    // Escribe el nuevo post's simultaneamente en el posts list y en el user's post list.
    var updates = {};
    updates['/inventario/' + newPostKey] = postData;
    vaciarCamps();
    return fb.update(updates);
}

/**Metodo que vacía una lista de campos**/
function vaciarCamps(){
    var inputs =[nameInstrument,typeInstrument];      
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].val("");
    } 
}