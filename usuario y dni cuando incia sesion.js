// usuario y dni cuando inicia sesion autocompletado en dos campos//

              //  ASIGNAR POR DEFECTO USUARIO Y DNI CUANDO EL USUARIO INICIA SESSION
                $('#frmDocumento #IdSupervisor').html(`<option value="${$dniU}" selected>${$nomU}</option>`);
                $('#frmDocumento #IdSupervisor').trigger('change');
                $('#frmDocumento #Supervisor').val($nomU);
