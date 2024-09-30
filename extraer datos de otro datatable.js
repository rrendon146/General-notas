//en nest unir las 2 tablas en findall

//html php
TablaHomePs = $('#TablaHomePs').DataTable({
                pagingType: "full_numbers",
                lengthMenu: [
                    [100, 200, 300],
                    [100, 200, 300],
                ],
                buttons: [
                    {
                        extend: 'collection',
                        exportOptions: {
                            modifier: {
                                page: 'all',
                                search: 'none'
                            }
                        },
                        text: 'Exportar',
                        buttons: [
                            'copy', 'excel', 'csv', 'pdf', 'print'
                        ]
                    }
                ],
                "searching": true,
                "order": [[2, "desc"]],
                "scrollX": true,
                language: {
                    sProcessing: "Procesando...",
                    sLengthMenu: "Mostrar _MENU_ registros",
                    sZeroRecords: "No se encontraron resultados",
                    sEmptyTable: "Ningún dato disponible en esta tabla",
                    sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                    sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                    sInfoPostFix: "",
                    sSearch: "Buscar:",
                    sUrl: "",
                    sInfoThousands: ",",
                    sLoadingRecords: "Cargando...",
                    oPaginate: {
                        sFirst: "|<",
                        sLast: ">|",
                        sNext: ">",
                        sPrevious: "<",
                    },
                    oAria: {
                        sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                        sSortDescending: ": Activar para ordenar la columna de manera descendente",
                    }
                },
                dom: "<'row'<'col-sm-3'l><'col-sm-3'f><'col-sm-6'p>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                "initComplete": function(settings, json) {
                    $('#tblDatos').waitMe('hide');
                },
                createdRow : function (row, data, rowIndex) {
                    // Per-cell function to do whatever needed with cells
                    $.each($('td', row), function (colIndex) {
                        // For example, adding data-* attributes to the cell
                        /* varDump( data );
                        varDump( data[colIndex] ); */
                        $(this).attr('data-id', data.id );
                        $(this).attr('data-uuid', data.uu_id );
                    });
                    $(row).attr('data-id', data.id );
                    $(row).attr('data-uuid', data.uu_id );

                    switch ( data.Estado ) {
                        case "Aprobado":
                            $('td' ,row ).eq(7).html(`<span class="label label-success"> Aprobado </span>`);
                        break;
                        case "Anulado":
                            $('td' ,row ).eq(7).html(`<span class="label label-danger"> Anulado </span>`);
                        break;
                        case "Digitado":
                            $('td' ,row ).eq(7).html(`<span class="label label-info"> Digitado </span>`);
                        break;
                    }

                    // Fecha Mod 5
                    $('td' ,row ).eq( 8 ).html( moment( data.updated_at ).format('DD/MM/YYYY HH:mm:ss') );
                },
                columns : [
                    { "data" : null ,
                        render: (data,type,row) => {
                        return `<div class=" edit_wrapper " data-idarti="${data.id}" ><a href='#' data-uuid="${data.uu_id}" data-id="${data.id}" class=" editarItem btn btn-primary btn-sm" ><i class="fa fa-edit" ></i></a></div>`;
                        }
                    },
                    { "data" : null ,
                        render: (data,type,row) => {
                        return `<div class=" del_wrapper " data-idarti="${data.id}" ><a href='#' data-uuid="${data.uu_id}" data-id="${data.id}" data-idarti="${data.id}" class=" anularItem btn btn-danger btn-sm" ><i class="fa fa-trash" ></i></a></div>`;
                        }
                    },
                    { "data" : "Codigo" } ,
                    { "data" : "Solicitante" } ,
                    { "data" : "Responsable" } ,
                    { "data" : "Area" } ,
                    {
                        "data": "detalle", // Aquí accedemos al campo detalle
                        "render": function(data, type, row) {
                            // Si 'detalle' no está vacío, accedemos al primer objeto
                            if (data && data.length > 0) {
                                return data[0].TipoEquipo; // Accedemos al campo 'Codigo' dentro del detalle
                            } else {
                                return "Sin detalle"; // Si no hay datos en 'detalle'
                            }
                        }
                    },
                    { "data" : "Estado" } ,
                    { "data" : "updated_at" } ,
                    { "data" : "Solicitante" } ,


                ],
                select: {
                    style: 'single'
                },
            });
