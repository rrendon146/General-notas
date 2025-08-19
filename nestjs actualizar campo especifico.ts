// actualizar campo especificos sin afectar otros campos cuando ya no se puede cambiar el documento estando aprobado o anulado


//BACKEND
//CONTROLLER

  @Patch('update-sub-estado-certificado/:uu_id')
  @HttpCode(200)
  async setSubEstadoCertificado(
      @Param('uu_id') uu_id: string,
    @Body() body: { subEstadoCertificado: string }
  ) {
    return this.ordenTrabajo31Service.setSubEstadoCertificado(uu_id, body.subEstadoCertificado);
  }
  // ..............................................................................
  // Actualizar Registro
  @Patch('update-registro/:uu_id')
  @HttpCode(200)
  async setRegistro(
    @Param('uu_id') uu_id: string,
    @Body() body: { Registro: string }
  ) {
    return this.ordenTrabajo31Service.setRegistro(uu_id, body.Registro);
  }
  // ..............................................................................
  // Actualizar subEstadoRegistro  
  @Patch('update-sub-estado-registro/:uu_id')
  @HttpCode(200)
  async setSubEstadoRegistro(
    @Param('uu_id') uu_id: string,
    @Body() body: { subEstadoRegistro: string }
  ) {
    return this.ordenTrabajo31Service.setSubEstadoRegistro(uu_id, body.subEstadoRegistro);
  }

// SERVICES
  async setSubEstadoCertificado(uu_id: string, subEstadoCertificado: string) {
    await this.ordenTrabajo31Model.update({ uu_id }, { subEstadoCertificado });
    return { version: '1' };
  }
  // ..............................................................................
  // ..............................................................................
  async setRegistro(uu_id: string, Registro: string) {
    await this.ordenTrabajo31Model.update({ uu_id }, { Registro });
    return { version: '1' };
  }
  // ..............................................................................
  // ..............................................................................
  async setSubEstadoRegistro(uu_id: string, subEstadoRegistro: string) {
    await this.ordenTrabajo31Model.update({ uu_id }, { subEstadoRegistro });
    return { version: '1' };
  }

//FRONTEND
//HTML

<div class=" row " >
            <!-- ./col -->
            <div class=" col-lg-3 col-md-3 " >
                <div class=" form-group ">
                    <label for="subEstadoCertificado" >Incluye Sub Estado Certificado?</label>
                    <select id="subEstadoCertificado" name="subEstadoCertificado" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="1">Si incluye sub estado certificado</option>
                        <option value="0">No incluye sub estado certificado</option>
                    </select>
                </div>
                <!-- ./form-group -->
            </div>
            <!-- ./col -->
            <div class=" col-lg-3 col-md-3 " >
                <div class=" form-group ">
                    <label for="subEstadoRegistro" >Incluye Sub Estado Registro?</label>
                    <select id="subEstadoRegistro" name="subEstadoRegistro" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="1">Si incluye sub estado registro</option>
                        <option value="0">No incluye sub estado registro</option>
                    </select>
                </div>
                <!-- ./form-group -->
            </div>
            <!-- ./col -->
            <div class=" col-lg-3 col-md-3 " >
                <div class=" form-group ">
                    <label for="Registro" >Incluye Registro?</label>
                    <select id="Registro" name="Registro" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="1">Si incluye Registro</option>
                        <option value="0">No incluye Registro</option>
                    </select>
                </div>
                <!-- ./form-group -->
            </div>
            <!-- ./col -->
             <div class=" col-lg-3 col-md-3 " >
                <div class=" form-group ">
                    
                </div>
                <!-- ./form-group -->
            </div>
        </div>
        <!-- ./row -->

//JAVASCRIPT
$("#subEstadoCertificado").on("change", function(e) {
            e.preventDefault();
            
            let nuevoSubEstado = $(this).val();
            let uu_id = $('#frmDocumento #uu_id').val();
            
            if (!uu_id) {
                tostada('Error', 'No hay una OT seleccionada', 'error');
                return;
            }
            
            // Validar que sea "0" o "1" como string
            if (nuevoSubEstado !== "0" && nuevoSubEstado !== "1") {
                tostada('Error', 'El valor debe ser "0" (No) o "1" (Sí)', 'error');
                return;
            }

            // Confirmar antes de cambiar
            let mensaje = nuevoSubEstado === "1" ? 'activar' : 'desactivar';
            
            $.confirm({
                title: 'Confirmar',
                type    : 'orange',
                content: `Confirme ${mensaje} el sub estado certificado`,
                autoClose: 'Cancelar|10000',
                buttons: {
                    Confirmar: {
                        keys: [ 'enter','Y' ],
                        text : 'Confirmar (Y)',
                        btnClass: 'btn-blue',
                        action : function () {
                            ejecutarSubEstadoCertificado( uu_id , nuevoSubEstado );
                        },
                    },
                    Cancelar: {
                        keys: [ 'N' ],
                        action : function () {
                            // Si cancela, revertir el select al valor anterior
                            let valorAnterior = nuevoSubEstado === "1" ? "0" : "1";
                            $('#subEstadoCertificado').val(valorAnterior);
                        }
                    },
                }
            });
        });
        /* ------------------------------------------------------------- */
        $("#subEstadoRegistro").on("change", function(e) {
            e.preventDefault();
            
            let nuevoSubEstadoRegistro = $(this).val();
            let uu_id = $('#frmDocumento #uu_id').val();
            
            if (!uu_id) {
                tostada('Error', 'No hay una OT seleccionada', 'error');
                return;
            }
            
            // Validar que sea "0" o "1" como string
            if (nuevoSubEstadoRegistro !== "0" && nuevoSubEstadoRegistro !== "1") {
                tostada('Error', 'El valor debe ser "0" (No) o "1" (Sí)', 'error');
                return;
            }

            // Confirmar antes de cambiar
            let mensaje = nuevoSubEstadoRegistro === "1" ? 'activar' : 'desactivar';

            $.confirm({
                title: 'Confirmar',
                type    : 'orange',
                content: `Confirme ${mensaje} el sub estado registro`,
                autoClose: 'Cancelar|10000',
                buttons: {
                    Confirmar: {
                        keys: [ 'enter','Y' ],
                        text : 'Confirmar (Y)',
                        btnClass: 'btn-blue',
                        action : function () {
                            ejecutarSubEstadoRegistro( uu_id , nuevoSubEstadoRegistro );
                        },
                    },
                    Cancelar: {
                        keys: [ 'N' ],
                        action : function () {
                            // Si cancela, revertir el select al valor anterior
                            let valorAnterior = nuevoSubEstadoRegistro === "1" ? "0" : "1";
                            $('#subEstadoRegistro').val(valorAnterior);
                        }
                    },
                }
            });
        });
        /* ------------------------------------------------------------- */
        $("#Registro").on("change", function(e) {
            e.preventDefault();
            
            let nuevoRegistro = $(this).val();
            let uu_id = $('#frmDocumento #uu_id').val();
            
            if (!uu_id) {
                tostada('Error', 'No hay una OT seleccionada', 'error');
                return;
            }
            
            // Validar que sea "0" o "1" como string
            if (nuevoRegistro !== "0" && nuevoRegistro !== "1") {
                tostada('Error', 'El valor debe ser "0" (No) o "1" (Sí)', 'error');
                return;
            }

            // Confirmar antes de cambiar
            let mensaje = nuevoRegistro === "1" ? 'activar' : 'desactivar';

            $.confirm({
                title: 'Confirmar',
                type    : 'orange',
                content: `Confirme ${mensaje} registro`,
                autoClose: 'Cancelar|10000',
                buttons: {
                    Confirmar: {
                        keys: [ 'enter','Y' ],
                        text : 'Confirmar (Y)',
                        btnClass: 'btn-blue',
                        action : function () {
                            ejecutarRegistro( uu_id , nuevoRegistro );
                        },
                    },
                    Cancelar: {
                        keys: [ 'N' ],
                        action : function () {
                            // Si cancela, revertir el select al valor anterior
                            let valorAnterior = nuevoRegistro === "1" ? "0" : "1";
                            $('#Registro').val(valorAnterior);
                        }
                    },
                }
            });
        });

function ejecutarSubEstadoCertificado(uu_id, subEstadoCertificado)
{
    //
    try {
        $('#frmDocumento').waitMe({
            effect  : 'facebook',
            text    : 'Actualizando subestado...',
            bg      : 'rgba(255,255,255,0.7)',
            color   : '#146436',fontSize:'20px',textPos : 'vertical',
            onClose : function() {}
        });

        var url = `${urlServicio}update-sub-estado-certificado/${uu_id}`, metodo = `PATCH`;
        let _dataSerializada = {
            subEstadoCertificado: subEstadoCertificado
        };

        $.ajax({
            url     : url,
            data    : JSON.stringify(_dataSerializada),
            method  : metodo,
            dataType: "json",
            contentType: "application/json",
            headers : {
                Authorization : `Bearer ${_session3001}`
            }
        })
        .done(function(json, textStatus, xhr) {
            //
            switch (xhr.status) {
                case 200:
                    // éxito
                    if(json.msg && json.msg.call === 'tostada2') {
                        tostada2(json.msg);
                    } else {
                        let estado = subEstadoCertificado === "1" ? 'activado' : 'desactivado';
                        tostada('Éxito', `Sub Estado Certificado ${estado} correctamente`, 'success');
                    }

                    // Actualizar la UI si es necesario
                    if(json.data) {
                        // Mantener el valor seleccionado en el select
                        $('#subEstadoCertificado').val(json.data.subEstadoCertificado);
                    }

                    // Opcional: recargar datos
                    BusquedaIniciada ? buscarAvanzadoOT() : null;

                    let IdOT = $('#frmDocumento #IdOT').val();
                    let uuID = $('#frmDocumento #uu_id').val();

                    // ******* NODE JS *******
                    socket.emit('accion:audit',{
                        user  : $nomU,
                        msg   : `Actualizar Sub Estado Certificado OT #${IdOT}` ,
                        dni   : $dniU,
                        serie : 0 , 
                        corr  : IdOT , 
                        form  : _AuthFormulario , 
                        url   : window.location.href , 
                        token : uuID 
                    });
                    // ******* NODE JS *******
                break;
                case 202:
                    // denegado
                    tostada(json.title, json.texto, json.clase);
                break;
                default:
                break;
            }
            /**/
        })
        .fail(function(xhr, status, error) {
            getError01(xhr, status, error);

            // En caso de error, revertir el select al valor anterior
            let valorAnterior = subEstadoCertificado === "1" ? "0" : "1";
            $('#subEstadoCertificado').val(valorAnterior);
        })
        .always(function() {
            $('#frmDocumento').waitMe('hide');
        });
    } catch (error) {
        alert(error);
        $('#frmDocumento').waitMe('hide');
    }
    //
}
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */

function ejecutarSubEstadoRegistro(uu_id, subEstadoRegistro)
{
    //
    try {
        $('#frmDocumento').waitMe({
            effect  : 'facebook',
            text    : 'Actualizando subestado...',
            bg      : 'rgba(255,255,255,0.7)',
            color   : '#146436',fontSize:'20px',textPos : 'vertical',
            onClose : function() {}
        });

        var url = `${urlServicio}update-sub-estado-registro/${uu_id}`, metodo = `PATCH`;
        let _dataSerializada = {
            subEstadoRegistro: subEstadoRegistro
        };

        $.ajax({
            url     : url,
            data    : JSON.stringify(_dataSerializada),
            method  : metodo,
            dataType: "json",
            contentType: "application/json",
            headers : {
                Authorization : `Bearer ${_session3001}`
            }
        })
        .done(function(json, textStatus, xhr) {
            //
            switch (xhr.status) {
                case 200:
                    // éxito
                    if(json.msg && json.msg.call === 'tostada2') {
                        tostada2(json.msg);
                    } else {
                        let estado = subEstadoRegistro === "1" ? 'activado' : 'desactivado';
                        tostada('Éxito', `Sub Estado Registro ${estado} correctamente`, 'success');
                    }

                    // Actualizar la UI si es necesario
                    if(json.data) {
                        // Mantener el valor seleccionado en el select
                        $('#subEstadoRegistro').val(json.data.subEstadoRegistro);
                    }

                    // Opcional: recargar datos
                    BusquedaIniciada ? buscarAvanzadoOT() : null;

                    let IdOT = $('#frmDocumento #IdOT').val();
                    let uuID = $('#frmDocumento #uu_id').val();

                    // ******* NODE JS *******
                    socket.emit('accion:audit',{
                        user  : $nomU,
                        msg   : `Actualizar Sub Estado Registro OT #${IdOT}` ,
                        dni   : $dniU,
                        serie : 0 , 
                        corr  : IdOT , 
                        form  : _AuthFormulario , 
                        url   : window.location.href , 
                        token : uuID 
                    });
                    // ******* NODE JS *******
                break;
                case 202:
                    // denegado
                    tostada(json.title, json.texto, json.clase);
                break;
                default:
                break;
            }
            /**/
        })
        .fail(function(xhr, status, error) {
            getError01(xhr, status, error);

            // En caso de error, revertir el select al valor anterior
            let valorAnterior = subEstadoRegistro === "1" ? "0" : "1";
            $('#subEstadoRegistro').val(valorAnterior);
        })
        .always(function() {
            $('#frmDocumento').waitMe('hide');
        });
    } catch (error) {
        alert(error);
        $('#frmDocumento').waitMe('hide');
    }
    //
}
/* ------------------------------------------------------------- */

function ejecutarRegistro(uu_id, Registro)
{
    //
    try {
        $('#frmDocumento').waitMe({
            effect  : 'facebook',
            text    : 'Actualizando subestado...',
            bg      : 'rgba(255,255,255,0.7)',
            color   : '#146436',fontSize:'20px',textPos : 'vertical',
            onClose : function() {}
        });

        var url = `${urlServicio}update-registro/${uu_id}`, metodo = `PATCH`;
        let _dataSerializada = {
            Registro: Registro
        };

        $.ajax({
            url     : url,
            data    : JSON.stringify(_dataSerializada),
            method  : metodo,
            dataType: "json",
            contentType: "application/json",
            headers : {
                Authorization : `Bearer ${_session3001}`
            }
        })
        .done(function(json, textStatus, xhr) {
            //
            switch (xhr.status) {
                case 200:
                    // éxito
                    if(json.msg && json.msg.call === 'tostada2') {
                        tostada2(json.msg);
                    } else {
                        let estado = Registro === "1" ? 'activado' : 'desactivado';
                        tostada('Éxito', `Registro ${estado} correctamente`, 'success');
                    }

                    // Actualizar la UI si es necesario
                    if(json.data) {
                        // Mantener el valor seleccionado en el select
                        $('#Registro').val(json.data.Registro);
                    }

                    // Opcional: recargar datos
                    BusquedaIniciada ? buscarAvanzadoOT() : null;

                    let IdOT = $('#frmDocumento #IdOT').val();
                    let uuID = $('#frmDocumento #uu_id').val();

                    // ******* NODE JS *******
                    socket.emit('accion:audit',{
                        user  : $nomU,
                        msg   : `Actualizar Registro OT #${IdOT}` ,
                        dni   : $dniU,
                        serie : 0 , 
                        corr  : IdOT , 
                        form  : _AuthFormulario , 
                        url   : window.location.href , 
                        token : uuID 
                    });
                    // ******* NODE JS *******
                break;
                case 202:
                    // denegado
                    tostada(json.title, json.texto, json.clase);
                break;
                default:
                break;
            }
            /**/
        })
        .fail(function(xhr, status, error) {
            getError01(xhr, status, error);

            // En caso de error, revertir el select al valor anterior
            let valorAnterior = Registro === "1" ? "0" : "1";
            $('#Registro').val(valorAnterior);
        })
        .always(function() {
            $('#frmDocumento').waitMe('hide');
        });
    } catch (error) {
        alert(error);
        $('#frmDocumento').waitMe('hide');
    }
    //
}
