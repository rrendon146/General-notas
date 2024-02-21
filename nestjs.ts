orden creacion

.entity agregar columnas / ahora entity la tabla pasar a controller y service mediante module entrar .module/ pasar a controller empezando a copiar y pegar
los import y copiar el api tag al main.ts por orden alfabetico luego agregar el 200 al post,get,get / luego crear el dto create 


//comentarios//
articulo e idarticulo son valores string porque en el softcom tiene codigo con letras, no numeros.


//.service proyecto logistica/modulo entrega uniformes error corregido en impresion detalle
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
