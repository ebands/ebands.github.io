$(document).ready(function(){
    pop =  $("#pop-up-info");

    $("#btnAdd").click(function(){
        pop.bPopup({
            zIndex: 4,
          modalClose: false,
          position: [750, 150]
        });
    });

    $("#date").datepicker();
  
});