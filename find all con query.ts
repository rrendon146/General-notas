  async getTodos() {
    try {
      const data = await this.solServiciosMedicosCabModel
        .createQueryBuilder('cab')
        .leftJoinAndSelect('cab.detalle', 'detalle')
        .orderBy('cab.id', 'DESC')
        .take(200)
        .getMany();

      return {
        data,
        version: '1',
        msg: {
          titulo: 'Correcto',
          texto: 'Registros cargados',
          clase: 'success',
          call: 'tostada2',
        },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }
