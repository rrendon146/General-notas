//proyecto tecnico - modulo monitoreo
//esto es cuando es horario UTC cuando cargue Z al final para convertirlo
// en html el codigo es:
                <label for="Fecha" >Fecha</label>
                <input type="date" name="Fecha" id="Fecha" class="form-control" value="" maxlength="150" />

//en funcion crearnuevo para que se limpie 

    $('#frmDocumento #FechaConstancia').val(FechaConstancia);

    $('#frmDocumento #Fecha').val(Fecha);

//en funcion editardoc o cargardoc para jalar el detalle al momento de editar

          let Fecha = moment(data.Fecha).format('YYYY-MM-DD'); //declarar variable fecha y llamar desde el postman data." "
          console.log(Fecha);

          let FechaConstancia = moment(data.FechaConstancia).format('YYYY-MM-DD'); //declarar variable fechaConstancia y llamar desde el postman data." "
          console.log(FechaConstancia);

          $('#frmDocumento #FechaConstancia').val(FechaConstancia);

          $('#frmDocumento #Fecha').val(Fecha);

