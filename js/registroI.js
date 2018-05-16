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

var btnRegistrar = $("#btnAddInvt");
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
        postItem();
       // addElement();       
     });
 });

/**Metodo que vacía una lista de campos**/
function vaciarCamps(){
    var inputs =[nameInstrument,typeInstrument];      
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].val("");
    } 
}

/**Metodo que realiza un post el cual agrega un elemento al inventario en la base de datos**/
function postItem(){    
      var options = {
        url: "/write_invent",
        dataType: "text",
        type: "POST",
        data: {nameInstrument:nameInstrument.val(),
             typeInstrument:typeInstrument.val() },//test: JSON.stringify( data ) }, // Our valid JSON string
        success: function( data, status, xhr ) {
           vaciarCamps();
        },
        error: function( xhr, status, error ) {
            //...
        }
      };
      $.ajax( options );
}
