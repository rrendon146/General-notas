  async findAll() {
    /* let data = await this.monitoreoModel.find({
      relations : {
        dCliente4 : true ,
        dLocal4 : true,
        dSuper1 : true
      },
      take : 100 ,
        order : {  
          IdMonitoreo : 'DESC'
        }
    }); */
    let data = await this.monitoreoModel.createQueryBuilder('c')
      .select([ 
        "c.*" , 
        "(SELECT Razon FROM orq_cliente WHERE IdClienteProv = c.IdClienteProv LIMIT 1 ) as Cliente" , 
        "(SELECT Descripcion FROM utb_sucursales WHERE IdSucursal = c.IdSucursal LIMIT 1 ) as Sucursal" , 
      ])
      .limit(100)
      .orderBy("c.IdMonitoreo", 'DESC')
      .getRawMany();

    return {
      data    : data , 
      version : '2'
    };
  }
