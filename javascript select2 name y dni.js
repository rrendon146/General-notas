// select2 a dos campos input y select2 
// JAVASCRIPT 
let IdEmp = $('#frmDocumento #IdEmp').select2({
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
            IdEmp.on("select2:select", function (e) { 
                var _Id = e.params.data.id, _Texto = e.params.data.text;
                
                $('#frmDocumento #IdEmp').append(new Option(_Id, _Id, true, true));
                $('#frmDocumento #Personal').val(_Texto);
            });


//HTML 
<div class=" col-lg-4 col-md-4 " >
                            <div class=" form-group ">
                                <label for="IdEmp">DNI</label>
                                <select type="number" id="IdEmp" name="IdEmp" class="form-control" ></select>
                            </div>
                            <!-- ./form-group -->
                        </div>
                        <!-- ./col -->
                        <div class=" col-lg-4 col-md-4 " >
                            <div class=" form-group ">
                                <label for="Personal">Nombre completo</label>
                                <input type="text" name="Personal" id="Personal" class="form-control" value="" maxlength="150" />
                            </div>
                            <!-- ./form-group -->
                        </div>
                        <!-- ./col -->
