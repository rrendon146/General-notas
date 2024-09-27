//controller en proyecto solicitud de equipos
  @Get()
  @HttpCode(200)
  async findAll(
    @Req() req: Request,
  ) {
    const headerToken = req.headers.authorization;
    const { idUser, username } = await this.util.getUserFromToken(headerToken);
    return this.solicitudEquiposService.findAll(idUser, username);
  }
//service
 async findAll(
    dni: number,
    username: string,
  ) {
    try {

      const revisarLider = await this.lideresEquipoService.revisarUsuario(dni);

      console.log(`revisarLider : ${revisarLider}`);

      let data = null;

      if (revisarLider == null) {
        data = await this.solicitudEquipoModel.find({
          take: 200,
          where: {
            DniUsuarioMod: dni
          },
          order: {
            id: 'DESC',
          }
        });

      } else {
        data = await this.solicitudEquipoModel.find({
          take: 200,
          order: {
            id: 'DESC',
          }
        });
      }

      const misSolicitudes = await this.solicitudEquipoModel.find({
        where : {
          IdSolicitante : dni}
      });

      return {
        data: data, misSolicitudes,
        message: 'Solicitud de Equipo encontradas',
        version: '1'
      };

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
