/*-------------------codigo simple para imprimir html sin convertir a pdf------------*/
Se crea el html en modal (ejemplo abajo) y luego el jquery

            $("#btnImprimirR").on( "click", function(e) {
                e.preventDefault();
                let _NroPa = $('#frmDocumento #Codigo').val();
                let _url = `${_URL_NESTMy}html/${_NroPa}.html`;           
                varDump( _url );  /*para leer mensaje en la consola de lo que se esta ejecutando o enviando*/
                $('#frmPrint').attr('src' , _url);        /*para links o paginas se cambia src por href, para iframe es src*/
                $('#mdlIMprimir').modal('show');

            });



/*--------------------HTML---------------------*/

<div class="modal fade" id="mdlIMprimir" role="dialog">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Imprimir.</h4>
            </div>
            <div class=" modal-body " style="" >
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe id="frmPrint" class="embed-responsive-item" src="" allowfullscreen></iframe>  /*considerar el id que se tomara en el jquery*/
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



/*--------------JQUERY-----------*/
/* Para links de paginas es href y para "iframke" es src*/


            $("#btnImprimirR").on( "click", function(e) {
                e.preventDefault();
                let _NroPa = $('#frmDocumento #Codigo').val();
                let _url = `${_URL_NESTMy}html/${_NroPa}.pdf`;
                varDump( _url );
                $('#frmPrint').attr('src' , `${_APP_URL}assets/img/asd.gif` );   /*_APP_URL variable ruta para sacar la imagen de "cargando" (assets es del codeigniter del proyecto en que se trabajo ejem logistica)*/
                descargarPDF();
                $('#mdlIMprimir').modal('show');
            });

/*--------------Funcion con ajax-----------*/
function descargarPDF(  )
{
	//
	try {
		$('#wrapper_form').waitMe({
			effect  : 'facebook',
			text    : 'Espere...',
			bg      : 'rgba(255,255,255,0.7)',
			color   : '#146436',fontSize:'20px',textPos : 'vertical',
			onClose : function() {}
		});

        let _NroPa = $('#frmDocumento #Codigo').val(); /*variable Codigo es el nro del documento (puede variar)*/
        let _url = `${_URL_NESTMy}html/${_NroPa}.pdf`;   /*url nestmy donde se aloja y .pdf para convertir de html a pdf*/
                                                        /* {_NroPa} ejemplo de variable en jquery*/
		$.ajax({
			url     : `${entrega_uniformes}pdf-uno`,     /*sacado del swagger al momento de crear el codigo en nestjs*/
			method  : "POST",
      data    : {Codigo:_NroPa},                  /*Codigo sacado de la variable del nestjs del codigo pdf-uno*/
			dataType: "json",
			headers : {
				Authorization : `Bearer ${_session3001}`
			}
		})
		.done(function(  json ,textStatus, xhr ) {
			//
            console.log(xhr.status);
			switch ( xhr.status )
            {
                case 200:

                    $('#frmPrint').attr('src' , `${_URL_NESTMy}html/${_NroPa}.pdf` );   /*codigo sacado del jquery a excepcion que en el jquery se cargo la imagen de cargando, aqui es el pdf*/

                break;
                case 202:
                    // denegado...
                    tostada( json.title , json.texto , json.clase );
                break;
                default:
                break;
            }
			/**/
		})
		.fail(function(xhr, status, error) {
            switch (xhr.status) {
                case 400://varios mensajes
                    let responseJSON = xhr.responseJSON;
                    let message = responseJSON.message;
                    if( message.length > 0 ){
                        for (let index = 0; index < message.length; index++) {
                            const item = message[index];
                            tostada2( { titulo : 'Error' , 'texto' : item , clase : 'error' } );
                        }
                    }else{
                        tostada2( { titulo : 'Error' , 'texto' : `${xhr.status}-${error}` , clase : 'error' } );
                    }
                break;
                default:
                    tostada2( { titulo : 'Error' , 'texto' : `${xhr.status}-${error}` , clase : 'error' } );
                break;
            }
			$('#wrapper_form').waitMe('hide');
		})
		.always(function() {
			$('#wrapper_form').waitMe('hide');
		});
	} catch (error) {
		alert( error );
		$('#wrapper_form').waitMe('hide');
	}
	//
}


/*------------------------------nestjs---------------------*/
para service:
tal cual se pega el codigo

async transformarHtml( file : string )
  {
    //

    let out;

    try {
      let _URL_PROYECTO = process.env.URL_PROYECTO;
      let comando = `xvfb-run wkhtmltopdf --enable-local-file-access ${_URL_PROYECTO}public/html/${file}.html ${_URL_PROYECTO}public/html/${file}.pdf`;
      out = await execShPromise( comando , true);
    } catch (e) {
      console.log('Error: ', e);
      console.log('Stderr: ', e.stderr);
      console.log('Stdout: ', e.stdout);

      return e;
    }

    console.log('out: ', out.stdout, out.stderr);

  return {
    data : 'ok'
  };

  }

para controller:
se modifica el codigo dependiendo de las columnas creadas en la base de datos

  @Post('pdf-uno')  /*se tomara pdf-uno del swagger */
    @HttpCode(200)
    async handleGenerarUno( @Body('Codigo') Codigo : string )    /*Codigo que ira a la funcion en el ajax*/
    {
      //
      return this.entregaUniformesCabService.transformarHtml( Codigo );
    }


