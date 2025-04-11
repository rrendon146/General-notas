//example

async rptEnvioBoletas3(Codigo: string, IdCliente: number, Mes: string, Anio: number) {
    const where = this.envioBoletasCabModel
      .createQueryBuilder('boletas')
      .leftJoinAndSelect('boletas.Detalles', 'detalles') // Relaciona la tabla `Detalles`
      .orderBy('boletas.Codigo', 'ASC'); // Ordena por la columna `Codigo` de menor a mayor
  
    // Filtros
    if (Codigo) {
      where.andWhere('boletas.Codigo = :Codigo', { Codigo });
    }
  
    if (IdCliente) {
      where.andWhere('boletas.IdCliente = :IdCliente', { IdCliente });
    }
  
    if (Mes) {
      where.andWhere('boletas.Mes = :Mes', { Mes });
    }
  
    if (Anio) {
      where.andWhere('boletas.Anio = :Anio', { Anio });
    }
  
    const dataCab = await where.getMany();
  
    // Generar Excel
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('REPORTE ENVIO BOLETAS');
  
    // Procesando la data para el Excel
    let RowData = [];
    for (let index = 0; index < dataCab.length; index++) {
      const rs = dataCab[index];
      const detalles = rs.Detalles; // Accede a los detalles relacionados
  
      // Contar el número de registros con Estado "Visualizado", "NO-EXISTE" y "Cargado"
      const visualizados = detalles.filter((detalle) => detalle.Estado === 'Visualizado').length;
      const noExiste = detalles.filter((detalle) => detalle.Estado === 'NO-EXISTE').length;
      const cargados = detalles.filter((detalle) => detalle.Estado === 'Cargado').length;
  
      let _o = {
        Codigo: rs.Codigo,
        Cliente: rs.Cliente,
        Categoria: rs.Categoria,
        Subcategoria: rs.Subcategoria,
        Mes: rs.Mes,
        Anio: rs.Anio,
        Visualizados: visualizados, // Número de registros visualizados
        NoExiste: noExiste, // Número de registros con estado "NO-EXISTE"
        Cargados: cargados, // Número de registros con estado "Cargado"
      };
      RowData.push(_o);
    }
  
    // Define las columnas del Excel (sin la columna `Estado`)
    const columns = [
      { key: 'Codigo', header: 'Codigo', width: 20 },
      { key: 'Cliente', header: 'Cliente', width: 20 },
      { key: 'Categoria', header: 'Categoria', width: 20 },
      { key: 'Subcategoria', header: 'Subcategoria', width: 20 },
      { key: 'Mes', header: 'Mes', width: 10 },
      { key: 'Anio', header: 'Año', width: 10 },
      { key: 'Visualizados', header: 'Visualizados', width: 15 }, // Nueva columna para el número de visualizados
      { key: 'NoExiste', header: 'No-Existe', width: 15 }, // Nueva columna para el número de "NO-EXISTE"
      { key: 'Cargados', header: 'Cargados', width: 15 }, // Nueva columna para el número de "Cargado"
    ];
  
    worksheet.columns = columns;
  
    // Agrega las filas al Excel
    RowData.forEach((row) => {
      worksheet.addRow(row);
    });
  
    // Define la ruta para guardar el archivo Excel
    const ruta = `${process.env.URL_PROYECTO}public/uploads/`;
    const exportPath = path.resolve(ruta, 'REPORTE-ENVIO-BOLETAS.xlsx');
  
    // Escribe el archivo Excel
    await workbook.xlsx.writeFile(exportPath);
  
    return {
      data: 'uploads/REPORTE-ENVIO-BOLETAS.xlsx',
      version: '1',
    };
  }
