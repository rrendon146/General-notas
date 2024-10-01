//vascript

function buscar()
{
	//
	try {
		$('#wrapperTable').waitMe({
			effect  : 'facebook',
			text    : 'Espere...',
			bg      : 'rgba(255,255,255,0.7)',
			color   : '#146436',fontSize:'20px',textPos : 'vertical',
			onClose : function() {}
		});

        let dataEnvio = {
            NroTelefono : $('#txtNroTelefono').val(),
            Placa : $('#txtNroPlaca').val(),
            IdResponsable : $('#frmBuscar #txtResponsable').val(),

        };

		$.ajax({
			url     : `${solicitud_equipos}buscar`,
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
			$('#wrapperTable').waitMe('hide');
		})
		.always(function() {
			$('#wrapperTable').waitMe('hide');
		});
	} catch (error) {
		alert( error );
		$('#wrapperTable').waitMe('hide');
	}
	//
}

//una vez relacionado las tablas funcion buscar dentro del cab y det tablas donde nrotelefono es det y cab idresponsable ejemplo

  async buscar(
    NroPlaca: string,
    IdResponsable: number,
    NroTelefono: string,
    Responsable: string,
    Observaciones:string,
    Codigo:string,

  ) {
    let queryC = this.solicitudEquipoModel
      .createQueryBuilder('c')
      .where('id > 0 ');

    const where = await this.solicitudEquipoModel.createQueryBuilder(
      'solicitud-equipos',
    );

    if (NroPlaca) {
      where.andWhere('NroPlaca = :NroPlaca', { NroPlaca: NroPlaca });
    }
    if (IdResponsable) {
      where.andWhere('IdResponsable like CONCAT("%",:IdResponsable,"%") ', { IdResponsable });
    }
    if (NroTelefono) {
      where.andWhere('NroTelefono like CONCAT("%",:NroTelefono,"%") ', { NroTelefono });
    }

    if (Responsable) {
      where.andWhere('Responsable like CONCAT("%",:Responsable,"%") ', { Responsable });
    }
    if (Observaciones) {
      where.andWhere('Observaciones like CONCAT("%",:Observaciones,"%") ', { Observaciones });
    }
    if (Codigo) {
      where.andWhere('Codigo like CONCAT("%",:Codigo,"%") ', { Codigo });
    }

    const dataCab = await where
      .leftJoinAndSelect('solicitud-equipos.detalle', 'detalle')
      .getMany();

    return {
      data: dataCab,
      version: '1',
    };
}
