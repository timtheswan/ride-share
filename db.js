
const knex = require('knex')({
    client: 'pg',
    connection: {
    host: 'faraday.cse.taylor.edu',
    user: 'tim_swanson',
    password: 'wijenara',
    database: 'tim_swanson'
     }
 });

 const objection = require('objection');
 const Model = objection.Model;
Model.knex(knex);

class driver extends Model {
    static get tableName() {
        return 'driver';
    }

    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: vehicle,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'authorization.driverId',
                        to: 'authorization.vehicleId'
                    },
                    to: 'vehicle.id'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: ride,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'drivers.driverId',
                        to: 'rideId'
                    },
                    to: 'ride.id'
                }
            }
        }
    }
}

class vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: driver,
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorization.vehicle_id',
                        to: 'authorization.driver_id'
                    },
                    to: 'driver.id'
                }
            },
            vehicle_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: vehicle_type,
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicle_type.id'
                }
            },

            rides: {
                relation: Model.HasManyRelation,
                modelClass: ride,
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'
                }
            }

        }
    }
}

class ride extends Model {
    static get tableName(){
        return 'ride';
    }
    static get relationMappings(){
        return{
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: driver,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideId',
                        to: 'drivers.driverId'
                    },
                    to: 'driver.id'
                }
            },
            ride: {
                relation: Model.HasOneRelation,
                modelClass: vehicle,
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                }
            }
        }
    }
}

class vehicle_type extends Model {
    static get tableName(){
        return 'vehicle_type';
    }
    static get relationMappings(){
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: vehicle,
                join: {
                    from: 'vehicle_type.id',
                    to: 'vehicle.vehicleTypeId'
                },
            }
        }
    }
}

class passenger extends Model {
    static get tableName(){
        return 'passenger';
    }
    static get relationMappings(){
        return {
            rides: {
                relation: this.ManyToManyRelation,
                modelClass: ride,
                join: {
                    from: 'passenger.id',
                    through: {
                        from: passengers.passengerId,
                        to: rideId
                    }
                }

            }
        }
    }
}
driver.query()
    .then(result => {
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })
    .finally(()=>{
        knex.destroy();
    });

    // vehicle.query()
    
//  knex
//      .select('firstname')
//      .from('driver')
//      .then(result => console.log(result))
//      .then(() => knex.destroy());