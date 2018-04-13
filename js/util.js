
$(function(){
    $("#nav-placeholder").load("nav.html");
    $("#sendMessageButton").click(function(){
      var parametros = {
        "valorCaja1" : 5,
        "valorCaja2" : 20
          };
          $.ajax({
                  data:  parametros,
                  url:   'send_form_email.php',
                  type:  'post',
                  beforeSend: function () {
                          alert("Procesando, espere por favor...");
                  },
                  success:  function (response) {
                          alert(response);
                  },
                  error: function(response){
                    alert(response);
                  }
          });
    });
  });