// variable de entorno, debe ser agregada para la conexión
var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
}; 

//////////////////////////////////////
//VARIABLES
/////////////////////////////////////

var tblEstudiantes = $("#tblMembers").DataTable();
var defaultApp = firebase.initializeApp(config);
var fb = firebase.database().ref();
var database = firebase.database();
var redt = database.ref('/estudiantes/');
var commentsRef = database.ref('estudiantes');
var url = "login.html";    
var key ;
var userId ;

/////////////////////////////////////////
//METODOS
/////////////////////////////////////////

function getFromServ(){
 
    $.ajax({
      url: "/read_estudiantes",
      type: 'GET',
      //dataType: 'json', // added data type
      success: function(res) {
        var btnBorrar = "<input type='image' src='../img/waste-bin1.png'  class='borrar' />";         
        res.forEach(function(element) {
          console.log(element);
          tblEstudiantes.row.add([
            element[0],
            element[1],
            element[2],
            element[3],
            element[4],
            element[5],
            element[6],
            element[7],
            element[8],
            element[9],
            element[10],
            element[11],
            element[12],
            element[13],
            element[14],
            btnBorrar
          ]).draw();  
        });
      
    
      },error: function (res, status, error) {
        alert("si, error", error);
      }
  });
}

/**Actualiza la información del DataTable**/
function rechargeTable() {
    tblEstudiantes
    .clear()
    .draw();
    try{
        getFromServ();    
    }catch(err){
        alert("cannot recharge de page")   
    }
}

/**Metodo de inialización del documento, comienza por aquí**/
$(function() {    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {    
        user = firebase.auth().currentUser;    
        getFromServ();
        
        } else {
            $(location).attr('href',url);   
        }
    });
});

//Metodo para eliminar un estudiante
function deleteBk(key){
    $.ajax({
        url: '/delete_estudiante',
        type: 'DELETE',    
        data: {id:key},//test: JSON.stringify( data ) }, // Our valid JSON string
        success: function( data, status, xhr ) {
            rechargeTable();
        },
        error: function( xhr, status, error ) {
            //...
        }

    });
}

/**Onclick de los botones edición del DataTable, Elimina la fila del boton que se haya seleccinado**/
tblEstudiantes.on('click', '.borrar', function () {
    var RowIndex = $(this).closest('tr');
    var data = tblEstudiantes.row(RowIndex).data(); 
    deleteBk(data[0]);
  });

