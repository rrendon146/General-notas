crearnuevo o btncrear
                        $('#frmDocumento #IdSolicitante').html(``);
                        $('#frmDocumento #IdSolicitante').trigger('change');

                        $('#frmDocumento #IdDepartamento').val(``);
                        $('#frmDocumento #IdDepartamento').trigger('change');

                        $('#frmDocumento #IdProvincia').html(``);
                        $('#frmDocumento #IdProvincia').trigger('change');

                        $('#frmDocumento #IdDistrito').html(``);
                        $('#frmDocumento #IdDistrito').trigger('change');

                        $('#frmDocumento #IdCliente').val(``);
                        $('#frmDocumento #IdCliente').trigger('change');

                        $('#frmDocumento #IdSucursal').html(``);
                        $('#frmDocumento #IdSucursal').trigger('change');

                        $('#frmDocumento #Atencion').val(``);
                        $('#frmDocumento #Atencion').trigger('change');

                        $('#frmDocumento #IdServicio').val(``);
                        $('#frmDocumento #IdServicio').trigger('change');

                        $('#frmDocumento #FechaPlat').val(FechaPlat);

                        $('#frmDocumento #FechaInst').val(FechaInst);



funcion cargardoc/editardoc con json
                        $.each( json.data , function( key , value ){
                        $('#frmDocumento #'+key).val(value);
    
                        });
                        let data = json.data;

                        $('#frmDocumento #IdSolicitante').html(`<option value="${json.data.IdSolicitante}" >${json.data.Solicitante}</option>`); 
                        $('#frmDocumento #IdSolicitante').trigger('change');

                        $('#frmDocumento #IdDepartamento').val(json.data.IdDepartamento); 
                        $('#frmDocumento #IdDepartamento').trigger('change');
                        
                        $('#frmDocumento #Departamento').val(json.data.Departamento); 
                        $('#frmDocumento #Departamento').trigger('change');

                        $('#frmDocumento #IdProvincia').html(`<option value="${json.data.IdProvincia}" >${json.data.Provincia}</option>`); 
                        $('#frmDocumento #IdProvincia').trigger('change');

                        
                        $('#frmDocumento #IdDistrito').html(`<option value="${json.data.IdDistrito}" >${json.data.Distrito}</option>`); 
                        $('#frmDocumento #Distrito').trigger('change');

                        $('#frmDocumento #IdCliente').trigger('change');

                        $('#frmDocumento #IdSucursal').trigger('change');

                        $('#frmDocumento #IdServicio').trigger('change');

                        let FechaPlat = moment(data.FechaPlat).format('YYYY-MM-DD'); //declarar variable fecha y llamar desde el postman data." "
                        console.log(FechaPlat);
              
                        let FechaInst = moment(data.FechaInst).format('YYYY-MM-DD'); //declarar variable fechaConstancia y llamar desde el postman data." "
                        console.log(FechaInst);

                        $('#frmDocumento #FechaPlat').val(FechaPlat);
              
                        $('#frmDocumento #FechaInst').val(FechaInst);


