var inputPago= $("#namePagos");
var jumb = $("#jumbotro");
var date;
$(document).ready(function(){
    pop =  $("#pop-up-info");
    date =    $("#date").datepicker()
    $("#btnAdd").click(function(){
        pop.bPopup({           
             zIndex: 4,
            modalClose: false,
          position: [531, 150]
        });
    });
    $(".b-close").click(function(){
        
        date.datepicker("hide");
    });

    $("#btnAceptar").click(function(){
        pop.close();
        date.datepicker("hide");
        postTipoPago();
    });

    getFromServ();
  

});


function postTipoPago(){
    
    var options = {
      url: "/write_pago",
      dataType: "text",
      type: "POST",
      data: {nameTipoPago:inputPago.val(),
          fecha:date.val() },//test: JSON.stringify( data ) }, // Our valid JSON string
      success: function( data, status, xhr ) {
        jumb.empty();
        getFromServ();
        vaciarCamps();
      },
      error: function( xhr, status, error ) {
          //...
      }
    };
    $.ajax( options );
}
function getFromServ(){ 
    $.ajax({
      url: "/read_pagos",
      type: 'GET',
      //dataType: 'json', // added data type
      success: function(res) {
        var button;
        res.forEach(function(element) {
          console.log(element);
          button = ' <button type="button" class="btn btn-primary btn-lg btn-block">'+element[2] +'</button> ';
          jumb.append(button);            
          
        });      
    
      },error: function (res, status, error) {
        alert("si, error", error);
      }
  });
  }
  
/**Metodo que vacía una lista de campos**/
function vaciarCamps(){
    var inputs =[inputPago,date];      
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].val("");
    } 
}

 

 
 

  
   

 


