//php-html

<!-- MODAL BUSCAR -->
<div class="modal fade" id="mdlBuscar" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md " role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-center" id="myModalLabel">Filtro de busqueda</h4>
            </div>

            <div class="modal-body">
                <form id="frmBuscar" autocomplete="off">

                    <input type="hidden" name="uu_id" id="uu_id" value="" />
                    <input type="hidden" name="Codigo" id="Codigo" value="" />
                    <input type="hidden" name="Responsable" id="Responsable" value="" />



                    <div class="row">
                        <!-- <div class="  col-lg-4 col-md-4 col-sm-4 ">
                            <div class=" form-group ">
                                <label for="txtInicio">Fecha Inicio</label>
                                <input type="date" name="txtInicio" id="txtInicio" class="form-control" value="" maxlength="150" />
                            </div>
                        </div>
                        <!-- ./col -->
                      <!--   <div class="  col-lg-4 col-md-4 col-sm-4 ">
                            <div class=" form-group ">
                                <label for="txtFin">Fecha Fin</label>
                                <input type="date" name="txtFin" id="txtFin" class="form-control" value="" maxlength="150" />
                            </div>
                        </div>  -->

                    </div>
                    <div class="row">
                        <div class=" col-lg-12 col-md-12 col-sm-12">
                            <div class=" form-group ">
                                <label for="txtSerie">Serie</label>
                                <input type="text" name="txtSerie" id="txtSerie" class="form-control text-left input-md " value="" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-lg-12 col-md-12 col-sm-12">
                            <div class=" form-group ">
                                <label for="txtNroTelefono">Numero telefono</label>
                                <input type="text" name="txtNroTelefono" id="txtNroTelefono" class="form-control text-left input-md " value="" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-lg-12 col-md-12 col-sm-12">
                            <div class=" form-group ">
                                <label for="txtNroPlaca">Numero Placa</label>
                                <input type="text" name="txtNroPlaca" id="txtNroPlaca" class="form-control text-left input-md " value="" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-lg-12 col-md-12 col-sm-12">
                            <div class=" form-group ">
                                <label for="txtResponsable">Nombre Responsable</label>
                                <select id="txtResponsable" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>

            <div class="modal-footer">
                <div class=" row ">
                    <div class=" col-lg-3 col-md-3 ">
                    </div>
                    <div class=" col-lg-3 col-md-3 ">
                    </div>
                    <div class=" col-lg-3 col-md-3 ">
                        <button type="button" class="btn btn-default" data-dismiss="modal"> Cerrar </button>
                    </div>
                    <div class=" col-lg-3 col-md-3 ">
                        <a href="#" class=" btn btn-primary btn-block " id="btnBuscarRD"><i class="icofont-ui-add"></i> Buscar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


//en javascript ejemplo IdResponsable
 let txtResponsable = $('#frmBuscar #txtResponsable').select2({
                ajax: {
                    url : `${_URL_NESTMy}v1/registro-empleados/buscar/` ,
                    dataType : 'json',
                    data : function (params) {
                        var query = {
                            query : params.term,
                        }
                        return query;
                    }
                },
                processResults: function (data) {
                    return {
                    results: data
                    };
                },
                minimumInputLength : 3,width : '100%'
            });
            /* ------------------------------------------------------------- */
            /* ------------------------------------------------------------- */
            txtResponsable.on("select2:select", function (e) { 
                var _Id = e.params.data.id, _Texto = e.params.data.text;
                console.log("select2:select", _Id );
            });

function buscar()
{
	//
	try {
		$('.tabHome').waitMe({
			effect  : 'facebook',
			text    : 'Espere...',
			bg      : 'rgba(255,255,255,0.7)',
			color   : '#146436',fontSize:'20px',textPos : 'vertical',
			onClose : function() {}
		});

        let dataEnvio = {
            Cliente     : $('#txtClientes').val(),
            Sucursal    : $('#txtSucursal').val(),
            CodActivo   : $('#frmBuscar #txtCodActivo').val(),
            UsuarioMod  : $('#frmBuscar #txtSupervisor').val(),
            Tecnico     : $('#frmBuscar #txtTecnico').val(),
            Inicio      : _FechaInic_DRP , 
            Fin         : _FechaFin_DRP
        };

		$.ajax({
			url     : `${_urlServicio}buscar`,
			method  : "POST", 
            data    : dataEnvio , 
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
                    //
                    TablaHomePs.clear();
                    TablaHomePs.rows.add( json.data ).draw();
                    TablaHomePs.columns.adjust().draw();


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
			$('.tabHome').waitMe('hide');
		})
		.always(function() {
			$('.tabHome').waitMe('hide');
		});
	} catch (error) {
		alert( error );
		$('.tabHome').waitMe('hide');
	}
	//
}
