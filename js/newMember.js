var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
};  

////////////////////////////////////////
//Variables
///////////////////////////////////////
var defaultApp = firebase.initializeApp(config);
var fb = firebase.database().ref();
var fechaMatr = $("#tvDateMatr");
var fechaIngr = $("#tvDateIngr");
var nombre = $("#tvNombres");
var tipoDoc = $("#spTipoDoc");
var apellido = $("#tvApellido");
var numDoc = $("#tvNumDoc");
var fechaNac = $("#tvFechaNac");
var rh = $("#spRH");
var sexo = $("#spSexo");
var dir = $("#tvDir");
var telefono = $("#tvTelefono");
var celular = $("#tvCelular");
var salud = $("#spEPS");
var escuadron = $("#spInstrumentos");
var btnAddEst = $("#btnAddEst")

//////////////////////////
//Metodos
/////////////////////////

//Metodo de inialización del documento, comienza por aquí
$(function(){     
    btnAddEst.click(function() {
        postEst();
        vaciarCampos();     
        //nombre.val();
     });
 });
 

 //Metodo de inicializacion de los datepicker
$(document).ready(function(){
    date1 = $("#tvDateMatr").datepicker();
    date2 = $("#tvDateIngr").datepicker();
    date3 = $("#tvFechaNac").datepicker();
});

//Metodo que envia los campos a la peticion post en el backend
function postEst(){
    var options = {
      url: "/write_student",
      dataType: "text",
      type: "POST",
      data: {fechaMatr:fechaMatr.val(),
            fechaIngr:fechaIngr.val(),
            nombre:nombre.val(),
            tipoDoc:tipoDoc.val(),
            apellido:apellido.val(),
            numDoc:numDoc.val(),
            fechaNac:fechaNac.val(),
            rh:rh.val(),
            sexo:sexo.val(),
            dir:dir.val(),
            telefono:telefono.val(),
            celular:celular.val(),
            salud:salud.val(),
            escuadron:escuadron.val()},//test: JSON.stringify( data ) }, // Our valid JSON string
      success: function( data, status, xhr ) {
         //...
      },
      error: function( xhr, status, error ) {
          //...
      }
    };
    $.ajax( options );
}

//Metodo para vaciar los campos luego de que se agrega un nuevo estudiante
function vaciarCampos(){
    var inputs =[fechaMatr,fechaIngr,nombre,tipoDoc,apellido,numDoc,fechaNac,rh,
                sexo,dir,telefono,celular,salud,escuadron];      
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].val("");
    } 
}