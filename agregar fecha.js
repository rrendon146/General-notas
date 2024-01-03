//proyecto tecnico - modulo monitoreo
//esto es cuando es horario UTC cuando cargue Z al final para convertirlo
//poner variables parte top declaracion de variables - 
//se crearon variables _fechahoy y _fechahoy2
let _FechaHoy = moment().format('YYYY-MM-DD');
let _FechaHoy2 = moment().format('YYYY-MM-DD');

//en funcion crearnuevo para que se limpie 

    $('#frmDocumento #Fecha').val( _FechaHoy );

    $('#frmDocumento #FechaConstancia').val( _FechaHoy2 );

//en funcion editardoc o cargardoc para jalar el detalle al momento de editar

          let Fecha = moment(data.Fecha).format('YYYY-MM-DD'); //declarar variable fecha y llamar desde el postman data." "
          console.log(Fecha);

          let FechaConstancia = moment(data.FechaConstancia).format('YYYY-MM-DD'); //declarar variable fechaConstancia y llamar desde el postman data." "
          console.log(FechaConstancia);

          $('#frmDocumento #FechaConstancia').val(FechaConstancia);

          $('#frmDocumento #Fecha').val(Fecha);

