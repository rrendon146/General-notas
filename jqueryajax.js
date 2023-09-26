JQUERY LLAMAR FORMATO JSON POR METODO AJAX:

crear previamente un boton y luego generar una funcion para llamar los valores json por consola mediante WEB "XHR" NETWORK)
------------------------------------------------------------------------------------------------
JAVASCRIPT

(function($){

	$(document).ready(function()
		{
                $('#btnalerta2').click(function(e){
                                e.preventDefault();
                                getValores2();
                            });
//cerrar parentesis y llaves en esta seccion, previamente crear un boton en php

	
            <div id="imagen" style="background:green; min-height:100px;"> </div> 
		//en caso de añadir una imagen dentro de la web y aparezca para los formatos JSON con imagenes, se crea un div dentro de home.php
            

            
	
function getValores2() //funcion creada 
{
	//
	try {
		
		$.ajax({
			url     : "https://rickandmortyapi.com/api/character", //digitar la URL de donde se obtendra formato JSON
			method  : "GET", //para llamar al contenido
			dataType: "json", //formato JSON
			
		})
		.done(function(  json ,textStatus, xhr ) {
			//
            console.log(xhr.status);
			      switch ( xhr.status )
            {
                case 200:
                    //
                console.log(json); //arroje formato json en consola en caso de 200http si todo esta ok, por lo general se ejecuta cuando no hay nodos
             // console.log(json.results.length); /*para leer subcontenido o nodos dentro del formato json(results es el nombre del nodo de la url)(length subcarpetas)*/
                                                	

                //let imagen = $('#imagen'); // variable creada sacado del id div lineas anteriores

                //for (let index = 0; index < json.results.length; index++) { //para ejecutar todo el formato json con nodos (ejemp .results.length)
		for (let index = 0; index < json; index++) { //para ejecutar todo el formato json sin nodos
                  //const element = json.results[index]; //el simbolo . se pone para leer los nodos dentro del formato json (ejem .results) y el index para leer todo
		    const element = json[index]; // por lo general se ejecuta para leer todo el formato json sin nodos
                 //  let origin = element.origin; //let variable que puede ser cambiada //agregado para el json de imagenes
                   //let html = ''; //agregado para el json de imagenes
                   //html = `<img src="${element.image}" id="${element.id}" tittle="${element.name}"/>`; //las comillas ``es para llamar javascript dentro de un element html
                  //imagen.append(html);
                  
                    console.log(element.id, element.gender); // para imprimir una columna o varias columnas con la coma ","
                //  console.log(element.origin.name); //para imprimir las subcarpetas o nodos dentro el punto "."
                }
                break;
                case 202:
                    // denegado...
                    tostada( json.title , json.texto , json.clase );
                break;
                default:
                break;
            }
			/**/
		})
		.fail(function(xhr, status, error) {
            switch (xhr.status) {
                case 400://varios mensajes
                    let responseJSON = xhr.responseJSON;
                    let message = responseJSON.message;
                    if( message.length > 0 ){
                        for (let index = 0; index < message.length; index++) {
                            const item = message[index];
                            tostada2( { titulo : 'Error' , 'texto' : item , clase : 'error' } );
                        }
                    }else{
                        tostada2( { titulo : 'Error' , 'texto' : `${xhr.status}-${error}` , clase : 'error' } );
                    }
                break;
                default:
                    tostada2( { titulo : 'Error' , 'texto' : `${xhr.status}-${error}` , clase : 'error' } );
                break;
            }
			$('#wrapper_form').waitMe('hide');
		})
		.always(function() {
			$('#wrapper_form').waitMe('hide');
		});
	} catch (error) {
		alert( error );
		$('#wrapper_form').waitMe('hide');
	}
	//
}
