var inputPago= $("#namePagos");
var jumb = $("#jumbotro");
var date;
var mapPagos={};
var tblPagoEst = $("#tblPagoEst").DataTable();
var popPago =$("#pop-up-pago");
var keyStudent;
var keyPago;
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
          fecha:date.val(), estado:"estado" },//test: JSON.stringify( data ) }, // Our valid JSON string
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
          mapPagos[element[0]] =[element[1], element[2]];
          button = ' <button type="button" class="btn btn-primary btn-lg btn-block "'+'id="'+element[0] +'">'+element[2] +'</button> ';
          jumb.append(button);            
          
        });      
    
      },error: function (res, status, error) {
        alert("si, error", error);
      }
  });
  }
  
jumb.on('click', '.btn', function () {
    var array = $(this);
    // var button = $(this).getAttribute('href');      
    popPago.bPopup({           
        zIndex: 4,
        modalClose: true,
        position: [310, 76]
    });
    keyPago = array.attr("id");    
    getStudents();
});

tblPagoEst.on('change', '.checkbox', function () {     
       
    var RowIndex = $(this).closest('tr');
    var data = tablePagos.row(RowIndex).data();    

     var boxes = $('input[name='+mapKeyDoc[data[0]]+']:checked');     
     boxes.each(function(){          
         copyMapFecha[$(this).val()]=1;            
        
     });     
     var unboxes =$('input[name='+mapKeyDoc[data[0]]+']:not(:checked)');
     unboxes.each(function(){          
         copyMapFecha[$(this).val()]=0;            
       
     });    
     addPagoEstudent("a"+year,mapKeyDoc[data[0]], copyMapFecha);
 
   });


/**Metodo que vacía una lista de campos**/
function vaciarCamps(){
    var inputs =[inputPago,date];      
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].val("");
    } 
}

  
$("#b-closePago").click(function(){  
    popPago.close();
});

function getStudents(){
    tblPagoEst
     .clear()
     .draw();
    $.ajax({
        url: "/read_pagosEst",
        type: 'GET',
        //dataType: 'json', // added data type
        success: function(res) {
          var btnCheck ="<input type='image' src='../img/checkPago.png'  class='edicion' />";          
        
          res.forEach(function(element) {
            var checkbox1 = ' <input type="checkbox" name="'+ element[0]+'" value="enero" class="checkbox">';
            console.log(element);
            tblPagoEst.row.add([
              element[0],
              element[1],
              element[2],
              element[3],
              checkbox1 
            
            ]).draw();  
          });    
        },error: function (res, status, error) {
          alert("si, error", error);
        }
    });
}

 

 
 

  
   

 


