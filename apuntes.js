//proyecto tecnico - modulo certificado
//para cambiar el estado de aprobado,digitado o anulado de una ID=Estado y cambiar su color 
// addClass es para añadir color al ID en este caso y removeClass es para remover el color ya puesto en el ID Estado



		    $('#frmDocumento #Estado').hide();
                    $('#frmDocumento #Estado').fadeIn('slow');
                    $('#frmDocumento #Estado').html(json.data.Estado);
                    switch( json.data.Estado )
                    {

                      case 'Aprobado':

                        $('#frmDocumento #Estado').removeClass('alert alert-info');
                        $('#frmDocumento #Estado').addClass('alert alert-success');

                      break;
                      case 'Anulado':
                        $('#frmDocumento #Estado').removeClass('alert alert-success');
                        $('#frmDocumento #Estado').addClass('alert alert-danger');

                      break;
                    }


/* ------------------------------------------------------------- */                          

Error 201:
Se debe editar en el NEST los cambios ingresando el dato http para que puedan guardarse correctamente los cambios
-----------------------------------------------------------------
en js:
en function crearnuevo
				agregar     $('#frmDocumento #Codigo').val(0);
				para que el ID se refleje con 0 (Codigo es el ID del frmXXX que esta como readonly)
--------------------------------------------------------------------
en html frmXXX agregar un boton que indique "agregarnuevo" con el ID btnAgregar
				
en js para añadir boton "agregar nuevo" sin que salga:

en jquery agregar
				$("#btnAgregar").on( "click", function(e) {
		                e.preventDefault();
		                crearNuevo(                                  //el boton de agregarnuevo debe apuntar la funcion crearNuevo
		
		              	  );
		                
		           	});
añadir en funcion crearNUevo
debajo de let uuid
				    $('#frmDocumento #IdUsuario').html(``);
    				    $('#frmDocumento #IdUsuario').trigger('change');

