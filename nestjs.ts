////////////////////////////ORDEN CREACION////////////////////////////////////////////////////////////////

Creacion endpoint en el terminal Nestjs en el modo sudo: nest generate resource orq_informacion_planillas --no-spec

.entity agregar columnas / ahora entity la tabla pasar a controller y service mediante module entrar .module/ pasar a controller empezando a copiar y pegar
los import y copiar el api tag al main.ts por orden alfabetico luego agregar el 200 al post,get,get / luego crear el dto create 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////COMENTARIOS/////////////////////////////////////////////////////////////////////
- articulo e idarticulo son valores string porque en el softcom tiene codigo con letras, no numeros.

- EL endpoint esta en el .controller del proyecto (ejem @Controller ('entrega-uniformes-cab'))


///////////////////////////////////////////////////////////////////////////////////

    
///////////////////////// .service proyecto logistica/modulo entrega uniformes error corregido en impresion detalle ////////////////////
async create(dto: CreateEntregaUniformesCabDto) {


    let dataUno = await this.entregaUniformesCabModel.create( dto );
    let Guardado = await this.entregaUniformesCabModel.save( dataUno) ;
    let Codigo = await this.util.addZeros( Guardado.id , 8 );


    await this.entregaUniformesCabModel.update({id:Guardado.id},{Codigo:`EU${Codigo}`});
    await this.detalle.unirEncabezado(Guardado.id, Guardado.uu_id);

    let dataDet = await this.dataDet.GetDetalle2(Guardado.id );       //anteriormente en la linea 18 solo permitia imprimir detalle unica vez y luego no
                                                                      //luego se puso linea 23 para generar detalle en la impresion consecutivamente

    let data = await this.entregaUniformesCabModel.findOne({
      where : {
        id : Guardado.id
      }
    });

    await this.generarHtml( data, dataDet );

    return {
      data : data ,
      version: '1' ,
    };
  }

///////////////////////////////////////////////////////////////////////////////////
////////////////crear funcion para imprimir documento /////////////////////////////
- Ir carpeta utilidades en .service y crear un nuevo css
    
- Luego ir .service del proyecto a ejecutar y en la parte superior en importa copiar los codigos
import { readFileSync, writeFileSync } from 'fs';
const execShPromise = require("exec-sh").promise;

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { v4 as uuidv4 } from 'uuid';

(esto se encuentra en nest gitdedany)

- luego crear la funcion generarHtml en create, update y aparte (parte inferior) del proyecto .service
en create:

let data1 = await this.registroEmpleadoModel.findOne({   //registroEmpleadoModel se cambia segun el proyecto
      where : {
        id : data.id                                     //data es del codigo .save ejem:     let data = await this.registroEmpleadoModel.save( newArea ); (esta dentro del create)
      }
    });                                                  //se agrego data1 variable para poner en el pametro generarhtml "findOne"


await this.generarHtml( data1 );

en update:

  let data = await this.registroEmpleadoModel.findOne({    //codigo ya existente en el proyecto
      where : {
        uu_id: uuid

      }

    });

  await this.generarHtml( data );           //data viene de la variable data de findOne

funcion parte inferior codigo:

async generarHtml( dataCab:RegistroEmpleadoModel )
{
  //
  let cssDeclaracionJurada = await this.util.cssDeclaracionJurada();
  let _URL_NEST_MYSQL = process.env.URL_NEST_MYSQL;
  let urlNest = process.env.URL_NEST_MYSQL;



  let html = `

  //aqui va el html //


  ${cssDeclaracionJurada} // terminando el head se declara el css
      </head>
`;

// TERMINAMOS DE ESCRIBIR EL ARCHIVO
let _uuid = uuidv4();
let _URL_PROYECTO = process.env.URL_PROYECTO;
let NombreArchivo = `${_uuid}`;
NombreArchivo     = `${dataCab.DNI}`;
let pathPhp       = `${process.env.URL_PROYECTO}public/html/${NombreArchivo}.html`;
writeFileSync( pathPhp , html );

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
writeFileSync( pathSH , _dataEscribe );
//
return {
 bash    : _fileFinal,
 file    : `${NombreArchivo}`,
 version : 1,
 //data    : data
};
}


///////////////////////////////////////////////////////////////////////
///////////////////////CONVERTIR HTML A PDF IMPRESION /////////////////////////////////////


en el .service:
- pegar codigo sin modificar

async transformarHtml( file : string )
  {
    //

    let out;

    try {
      let _URL_PROYECTO = process.env.URL_PROYECTO;
      let comando = `xvfb-run wkhtmltopdf --enable-local-file-access ${_URL_PROYECTO}public/html/${file}.html ${_URL_PROYECTO}public/html/${file}.pdf`;
      out = await execShPromise( comando , true);
    } catch (e) {
      console.log('Error: ', e);
      console.log('Stderr: ', e.stderr);
      console.log('Stdout: ', e.stdout);

      return e;
    }

    console.log('out: ', out.stdout, out.stderr);

  return {
    data : 'ok'
  };

  }

- luego parte superior pegar codigo (para registros-empleados no se requirio el codigo)

async generarPDF( IdCab : number )
  {
    //
    let data = await this.entregaUniformesCabModel.findOne({
      where : {
        id  : IdCab                                                    //IdCab es el id del detalle proyecto entrega_uniformes
      }
    });
    let NombreArchivo     = `${data.Codigo}`;
    await this.transformarHtml( NombreArchivo );
    return NombreArchivo;
    //
  }

- en .controller del proyecto

   @Post('pdf-uno')
   @HttpCode(200)
   async handleGenerarUno( @Body('id') id : string )                        //id en proyecto registros_empleados y en entrega uniformes IdCab id del detalle
   {
     //
     return this.registroEmpleadosService.transformarHtml( id );
   }


















