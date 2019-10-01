
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
                        from: 'authorization.driver_id',
                        to: 'authorization.vehicle_id'
                    },
                    to: 'vehicle.id'
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
            }
        }
    }
}



driver.query()
    .then(drivers => {
        console.log(drivers[0]);
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })
    .finally(()=>{
        knex.destroy();
    });

//  knex
//      .select('firstname')
//      .from('driver')
//      .then(result => console.log(result))
//      .then(() => knex.destroy());