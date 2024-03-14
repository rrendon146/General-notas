html:
<button id="btnLimpiar" type="button" class="btn btn-primary">Limpiar</button>

javascript:

 $("#btnLimpiar").on( "click", function(e) {
        let limpiar1 = $('#mdlFiltro #cboCliente');
        limpiar1 =     $('#mdlFiltro #cboCliente').html(``);
        $('#mdlFiltro #cboCliente').trigger('change');

        let limpiar2 = $('#mdlFiltro #cboLocal');
        limpiar2 =     $('#mdlFiltro #cboLocal').html(``);
        $('#mdlFiltro #cboLocal').trigger('change');

      });
