en caso este desordenado en tablahomeps digitar en caso solo exista la columna editar y no anular (ya que no era necesario) para que se ordene

                "order"     : [[ 1, "DESC" ]],
                  
(ejemplo en contratos usuarios app / en el nest registro empleados)
// AÑADIR BOTON DESCARGAR EN EL TABLAHOMEPS 
                  
EN HOME AÑADIR EL CAMPO Y EN JS AÑADIR TAMBIEN EL CAMPO
SE AÑADIO DNI ya que en el nest esta como parametro el generarHTML el DNI
$(this).attr('data-dni', data.DNI );
$(row).attr('data-dni', data.DNI );
{ "data" : null ,
                        render: (data,type,row) => {
                            if(data.AceptaTerminos=='SI'){
                                return `<button class="verItem btn btn-primary btn-sm" data-id="${data.id}" data-uuid="${data.uu_id}" data-dni="${data.DNI}">Descargar</button>`;
                            } else {
                                return '';
                            }
                        }
                    },

// luego se traspasa al tablahomeps
TablaHomePs = $('#TablaHomePs').DataTable({
                pagingType : "full_numbers",
                lengthMenu : [
                    [ 20 , 40, 60 ],
                    [ 20 , 40, 60 ],
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
                            'copy','excel','csv','pdf', 'print'
                        ]
                    }
                ],
                "searching" : true,
                "order"     : [[ 0, "desc" ]],
                "scrollX"   : true,
                language : {
                    sProcessing : "Procesando...",
                    sLengthMenu : "Mostrar _MENU_ registros",
                    sZeroRecords: "No se encontraron resultados",
                    sEmptyTable : "Ningún dato disponible en esta tabla",
                    sInfo       : "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    sInfoEmpty  : "Mostrando registros del 0 al 0 de un total de 0 registros",
                    sInfoFiltered   : "(filtrado de un total de _MAX_ registros)",
                    sInfoPostFix    : "",
                    sSearch         : "Buscar:",
                    sUrl            : "",
                    sInfoThousands  : ",",
                    sLoadingRecords : "Cargando...",
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
                        $(this).attr('data-id', data.id );
                        $(this).attr('data-uuid', data.uu_id );
                        $(this).attr('data-dni', data.DNI );
                    });
                    $(row).attr('data-id', data.id );
                    $(row).attr('data-uuid', data.uu_id );
                    $(row).attr('data-dni', data.DNI );

                    // Fecha Mod 5
                    $('td' ,row ).eq( 7 ).html( moment( data.created_at ).format('DD/MM/YYYY HH:mm:ss') );
                },
                columns : [
                    { "data" : "id" } ,
                    { "data" : "Nombre" } , 
                    { "data" : "Paterno" } ,
                    { "data" : "Materno" } ,
                    { "data" : "Correo" } ,
                    { "data" : "DNI" } ,
                    { "data" : "Celular" } ,
                    { "data" : "created_at" } ,
                    { "data" : null ,
                        render: (data,type,row) => {
                            if(data.AceptaTerminos=='SI'){
                                return `<button class="verItem btn btn-primary btn-sm" data-id="${data.id}" data-uuid="${data.uu_id}" data-dni="${data.DNI}">Descargar</button>`;
                            } else {
                                return '';
                            }
                        }
                    },
                    { "data" : "AceptaTerminos" } ,
                ],
                select: {
                    style: 'single'
                },
            });

AGREGAR EN EL JQUERY EL SIGUIENTE CODIGO

         $(document).delegate('.verItem', 'click', function(event) {
                event.preventDefault();
                let DNI = $(this).data('dni');
                console.log(DNI);
                let _url = `${_URL_NESTMy}html/${DNI}.pdf`;
                window.open(_url, '_blank');
            });

// en el nest se añadio el siguiente codigo controller (ejemplo en registros empleados en nest)
  @Post('pdf-uno')
  @HttpCode(200)
  async handleGenerarUno(@Body('IdFile') IdFile: string) {
    //
    return this.registroEmpleadosService.transformarHtml(IdFile);
  }

// en el service

 // IMPRESION DECLARACION JURADA DOCUMENTO
  async generarHtml(dataCab: RegistroEmpleadoModel) {
    //
    let cssDeclaracionJurada = await this.util.cssDeclaracionJurada();
    let _URL_NEST_MYSQL = process.env.URL_NEST_MYSQL;
    let urlNest = process.env.URL_NEST_MYSQL;

    let FirmaUser = ``;
    if( dataCab.Firma ){
      FirmaUser = `<img src="${urlNest}${dataCab.Firma}" alt="" style="width: 100%; max-width: 200px;" />`;
    }
    

    let html = `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!-- NAME: GDPR SUBSCRIBER ALERT -->
            <!--[if gte mso 15]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title> DECLARACION JURADA DE VERACIDAD, NOTIFICACION Y TRATAMIENTO DE DATOS</title>

        ${cssDeclaracionJurada}
        </head>

        
        <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="3">
              <table>
                <tr>
                  <td class=" border-left border-right border-top border-bot " style="width: 15%;padding-top: 15px;" >
                    <img
                      src="https://api.ssays-orquesta.com/logo-ssays-2019-2.png"
                      style="width: 100%; max-width: 200px"
                    />
                  </td>
                  <td class=" border-top border-bot border-right " >
                    <h3 class="centrar" style="margin-bottom: 0px;" >DECLARACION JURADA DE VERACIDAD, NOTIFICACION Y TRATAMIENTO DE DATOS</h3>
                  </td>
                  <td class=" border-right border-top border-bot " style="width: 20%;" >
                    <p class="centrar"><strong>S/C<br>Version:00</strong></p><br>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="6" >
              <table>
                <tr>
                  <td >
                    <p style="text-align: justify;"><font size="3">Yo ${dataCab.Nombre} de nacionalidad peruana identificado(a) con DNI N° ${dataCab.DNI}, en calidad de trabajador a efectos de cumplir
                      con los requisitos correspondientes al procedimiento de datos.</font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <h3>DECLARO BAJO JURAMENTO </h3>
                  </td>
                </tr>
                <tr>
                <td>
                  <p style="text-align: justify;" ><font size="3">1.- Que los siguientes documentos e informaciones son <strong>AUTÉNTICOS</strong> y respondan a la
                  verdad de los hechos que en ellos se consignan:</font></p>
                </td>
              </tr>

              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="" >
              <table>
                <tr>
                  <td colspan="2" class=" border-left border-right border-top " >
                    <p style="text-align: center;">N°</p>
                  </td>
                  <td colspan="4" class=" border-top border-right " >
                    <p style="text-align: center;" >Documento / Información</p>
                  </td>
                  <td colspan="4" class=" border-top border-right " >
                    <p style="text-align: center;" >Cantidad de Folios (Doc. Presenta el trabajador)</p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" class=" border-left border-right border-top " >
                    <p style="text-align: center;" >1</p>
                  </td>
                  <td colspan="4" class=" border-top border-right " >
                    <p style="text-align: center;" ></p>
                  </td>
                  <td colspan="4" class=" border-top border-right " >
                    <p style="text-align: center;" ></p>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" class=" border-left border-right border-bot border-top " >
                    <p style="text-align: center;" >2</p>
                  </td>
                  <td colspan="4" class=" border-bot border-top border-right " >
                    <p style="text-align: center;" ></p>
                  </td>
                  <td colspan="4" class=" border-bot border-top border-right " >
                    <p style="text-align: center;" ></p>
                  </td>
                </tr>
                
                
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td>
                    <p style="text-align: justify;"><font size="3">Declaro conocer que de comprobarse fraude, falsedad o inexactitud en la declaración,
                      información o documentación presentada, SSAYS S.A.C tendrá por no satisfecha la exigencia
                      de su presentación para todos los efectos y soy consciente de las responsabilidades de orden civil,
                      laboral y penal que conlleva, en ese sentido, asumo plena y de forma individual mi responsabilidad.</font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p style="text-align: justify;"><font size="3">2.- <strong>AUTORIZO a SSAYS S.A.C</strong> con RUC 20102187211, en calidad de empleador para que realice de forma
                    electrónica la entregas de boletas de pago, liquidación de Beneficios Sociales, Hojas de liquidación de CTS, Hojas de 
                    liquidación de gratificaciones, Hojas de liquidación de utilidades, Certificados de trabajo, Constancias de Altas 
                    y Ceses, Memorandos, capacitaciones, inducciones y cualquier otra información de carácter laboral, a la siguiente 
                    dirección electrónico / o Número de celular.</font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p style="text-align: justify;"><font size="3"><strong>Correo electrónico: </strong>${dataCab.Correo} N° de celular ${dataCab.Celular}<strong> Operador de línea de Móvil:<br>
                    </font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p style="text-align: justify;"><font size="3">Y otorgo mi consentimiento para que SSAYS S.A.C de acuerdo al Decreto Legislativo N° 1310 del año 2016, 
                      realice de forma electrónica la entrega de documentos laborales y me comprometo a confirmar la recepción
                      de los correos que se remitan.</font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p style="text-align: justify;"><font size="3">3.- Finalmente, de acuerdo a lo dispuesto por Ley 29733 (Ley de Protección de Datos personales) y su Reglamento,
                      quien suscribe brindo mi consentimiento de manera libre, previa, inequivoca, informada y expresa a SSAYS S.A.C a 
                      efectos incluye pero no se limita a: estadística y segmentación de acuerdo a edad, sexo, ubicación, preferencia y 
                      similares; tratamiento de historial de ex empleadores, de datos de salud, remuneraciones, estado civil, N° de HIjos, 
                      direcciones domiciliarias, convivientes o cónyuges, etc. Y declaro haber sido informado sobre mi derecho a solicitar 
                      el acceso, actualización, rectificación, oposición y cancelación de mis datos personales. Para ello debo remitir una 
                      comunicación identificándome y detallando mi requerimiento a las oficinas corporativas declarada a la Ficha Ruc. 
                      (Pasaje General Vivanco N°100, Pueblo Libre, Lima).
                      </font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p><font size="3"><strong>NOMBRE COMPLETO: ${dataCab.Nombre} ${dataCab.Paterno} ${dataCab.Materno}</strong></font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    ${FirmaUser}
                    <p><font size="3"><strong>FIRMA:</strong></font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="1" >
              <table>
                <tr>
                  <td >
                    <p><font size="3"><strong>HUELLA:</strong></font>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        
      </div>
    </body>
    </html>
    `;

    // TERMINAMOS DE ESCRIBIR EL ARCHIVO
    let _uuid = uuidv4();
    let _URL_PROYECTO = process.env.URL_PROYECTO;
    let NombreArchivo = `${_uuid}`;
    NombreArchivo = `${dataCab.DNI}`;
    let pathPhp = `${process.env.URL_PROYECTO}public/html/${NombreArchivo}.html`;
    writeFileSync(pathPhp, html);

    // ESCRIBIMOS EL SH PARA CONVERTIR A PDF
    let _fileFinal = `SH-${NombreArchivo}.sh`;
    let pathSH = `${process.env.URL_PROYECTO}public/html/${_fileFinal}`;
    let _dataEscribe = `
  #!/bin/bash
  cd ${_URL_PROYECTO}public/html/
  # Pasamos html a pdf
  xvfb-run wkhtmltopdf --enable-local-file-access ${NombreArchivo}.html ${NombreArchivo}.pdf
  # Eliminamos archivo SH
  cd ${_URL_PROYECTO}public/html/
  # rm ${NombreArchivo}.html
  `;
    writeFileSync(pathSH, _dataEscribe);
    await sleep( 2000 ); // Wait for one second
    await this.util.varDump( `HTML TERMINOS USUARIO GENERADO...` );
    // Generamos PDF
    await this.transformarHtml( `${dataCab.DNI}` );
    //
    return {
      bash: _fileFinal,
      file: `${NombreArchivo}`,
      version: 1,
      //data    : data
    };
  }


