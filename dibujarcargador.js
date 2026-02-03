
function dibujarCargador( idFolder , Folder )
{
    //
    const uploadImagen = $('#formData');
    
    // Limpiar event handlers previos ANTES de inicializar
    uploadImagen.off('fileuploaded');
    
    var _dataEnvio ={
        'Flag'  : 'SOLICITUD-MANTENIMIENTO-IMG' , 
        'Cod01' : $('#frmDocumento #Codigo').val(),
        'Id'    : $('#frmDocumento #id').val(),
        'Token' : $('#frmDocumento #uu_id').val(),
        'Glosa' : '',
        'idFolder' : 1 ,
        'Folder'   : Folder ,
    };
    $('#formData').fileinput({
        theme       : 'fas',
        language    : 'es',
        uploadUrl   : `${_URL_NESTMy}v1/archivos/fotos_folder/`,
        allowedFileExtensions: [ 'jpg' , 'jpeg' , 'png', 'pdf' ],
        showPreview     : true ,
        uploadExtraData : _dataEnvio,
        ajaxSettings: { headers: { Authorization : `Bearer ${_session3001}` } },
    }).on('fileuploaded', function( event, previewId, index, fileId) {
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
        /* console.log('File Uploaded', 'ID: ' + fileId + ', Thumb ID: ' + previewId);
        varDump( previewId.response ); */

        try {
            //TODO: DEVOLVER ARCHIVOS
            cargarArchivos( idFolder );
            reDibujarCargador( idFolder , Folder );
        } catch (error) {
            alert(error);
        }

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    }).on('filebatchuploadcomplete', function(event, preview, config, tags, extraData) {
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
        
        /* $('#formData').fileinput('refresh');
        $('#mdlDetalle').modal('show');
        $('#mdlArchivos56').modal('hide'); */
        //varDump( filebatchuploadcomplete );
        

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    }).on('fileuploaderror', function(event, data, msg) {
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
        console.log('File Upload Error', 'ID: ' + data.fileId + ', Thumb ID: ' + data.previewId);
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    });
}
