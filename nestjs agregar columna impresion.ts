// en el pdf se agrega columnas o campos al momento de digitar un dato, si no se agrega dato la columna no aparecera

async generarHtml(dataCab: SolicitudEquipoModel, dataDet) {
    //
    let cssSolicitudEquipos = await this.util.cssSolicitudEquipos();
    let _URL_NEST_MYSQL = process.env.URL_NEST_MYSQL;

    // DETALLE CELULAR
    let htmlDet = ``;
    console.log(`hay ${dataDet.length} detalle`);

    for (let index = 0; index < dataDet.length; index++) {
      const rs = dataDet[index];

      htmlDet += `
        <tr>
      ${
        rs.TipoEquipo
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Tipo de Equipo</td>`
          : ''
      }
      ${
        rs.Marca
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Marca</td>`
          : ''
      }
      ${
        rs.Serie
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Serie</td>`
          : ''
      }
      ${
        rs.NroPlaca
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Nro Placa</td>`
          : ''
      }
      ${
        rs.NroTelefono
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Numero</td>`
          : ''
      }
      ${
        rs.Imei
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Imei</td>`
          : ''
      }
      ${
        rs.Operador
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Operador</td>`
          : ''
      }
      ${
        rs.Proceso
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Proceso</td>`
          : ''
      }
      ${
        rs.Observaciones
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">Observaciones</td>`
          : ''
      }

        </tr>
        <tr>
      ${
        rs.TipoEquipo
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.TipoEquipo}</td>`
          : ''
      }
      ${
        rs.TipoEquipo
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Marca}</td>`
          : ''
      }
      ${
        rs.Serie
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Serie}</td>`
          : ''
      }
      ${
        rs.NroPlaca
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.NroPlaca}</td>`
          : ''
      }
      ${
        rs.NroTelefono
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.NroTelefono}</td>`
          : ''
      }
      ${
        rs.Imei
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Imei}</td>`
          : ''
      }
      ${
        rs.Operador
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Operador}</td>`
          : ''
      }
      ${
        rs.Proceso
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Proceso}</td>`
          : ''
      }
      ${
        rs.Observaciones
          ? `<td colspan="6" class="centrar border-left border-right border-top border-bot">${rs.Observaciones}</td>`
          : ''
      }
        </tr>

        
        `;
    }
