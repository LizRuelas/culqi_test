 $("#response-panel").hide();
      Culqi.publicKey = 'pk_test_Rp2uV5dXI3quFq2X';
      Culqi.settings({
        title: 'Culqi Store',
        currency: 'PEN',
        description: 'Polo/remera Culqi lover',
        amount: 10000
       });
       $('#miBoton').on('click', function (e) {
            // Abre el formulario con las opciones de Culqi.configurar
            Culqi.open();
            e.preventDefault();
        });
// Recibimos Token del Culqi.js
        function culqi() {
          if (Culqi.token) {
              // alert(Culqi.token.id);
              console.log(Culqi.token.id)
              $(document).ajaxStart(function(){
                run_waitMe();
              });
              // Imprimir Token
              $.ajax({
                 type: 'POST',
                 url: 'test/culqi-test.php',
                 data: { token: Culqi.token.id, installments: Culqi.token.metadata.installments },
                 datatype: 'json',
                 success: function(data) {

                   var result;

                   if(data.constructor == String){
                       result = JSON.parse(JSON.parse(data));
                   } else if(data.constructor == Object){
                       result = JSON.parse(JSON.stringify(data));
                   }

                   if(result.object === 'charge'){
                     resultdiv(result.outcome.user_message);
                   } else if(result.object == 'error'){
                     resultdiv(result.user_message);
                   }
                 },
                 error: function(error) {
                   resultdiv(error)
                 }
              });
          } else {
            // Hubo un problema...
            // Mostramos JSON de objeto error en consola
            $('#response-panel').show();
            $('#response').html(Culqi.error.merchant_message);
            $('body').waitMe('hide');
          }
        };
        function run_waitMe(){
          $('body').waitMe({
            effect: 'orbit',
            text: 'Procesando pago...',
            bg: 'rgba(255,255,255,0.7)',
            color:'#28d2c8'
          });
        }
        function resultdiv(message){
          $('#response-panel').show();
          $('#response').html(message);
          $('body').waitMe("hide");
        }
