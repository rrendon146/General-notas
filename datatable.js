agregar despliegue en el datatable

/* Despliegue, Detalle Columna  */


            function format(d) {
                // `d` is the original data object for the row
                return (
                    `<dl style="width: 100%; padding-left: 50px; padding-top:5px; ">
                        <dt>Cliente:</dt>
                        <dd>${d.Cliente}</dd>
                        <dt>Local:</dt>
                        <dd>${d.Local}</dd>
                        <dt>Area:</dt>
                        <dd>${d.Area}</dd>
                        <dt>Glosa:</dt>
                        <dd>${d.Observaciones}</dd>
                        <dt>Numero Telefono:</dt>
                        <dd>${d.detalle[0].NroTelefono}</dd>
                        <dt>Numero Placa:</dt>
                        <dd>${d.detalle[0].NroPlaca}</dd>
                    </dl>`
                );
            }

            TablaHomePs.on('click', 'td.details-control', function (e) {
                var tr = $(this).closest('tr');
                var row = TablaHomePs.row( tr );
          
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.find('svg').attr('data-icon', 'plus-circle');    // FontAwesome 5
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                  tr.find('svg').attr('data-icon', 'minus-circle'); // FontAwesome 5
                }
            } );
