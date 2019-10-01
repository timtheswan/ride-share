
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
class state extends Model {
    static get tableName() {
        return 'state';
    }
    static get relationMappings(){
        return {
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: state,
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            }
        }
    }
}

class location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings(){
        return {
            state: {
                relation: Model.ManyToManyRelation,
                modelClass: location,
                join: {
                    from: 'location.state',
                    to: 'state.abbreviation'
                }
            },
            ride_depart:{
                relation: Model.HasManyRelation,
                modelClass: ride,
                join:{
                    from:'location.id',
                    to:'ride.fromLocationId'
                }
            },
            ride_leave:{
                relation: Model.HasManyRelation,
                modelClass: ride,
                join:{
                    from:'location.id',
                    to:'ride.toLocationId'
                }
            }
        }
    }
}


// vehicle.query()
//     .then(vehicle => {
//         console.log(vehicle[0]);
//     })
//     .catch((err)=>{
//         console.log(err);
//         throw err;
//     })
//     .finally(()=>{
//         knex.destroy();
//     });
//
// driver.query()
//     .then(driver => {
//         console.log(driver[0]);
//     })
//     .catch((err)=>{
//         console.log(err);
//         throw err;
//     })
//     .finally(()=>{
//         knex.destroy();
//     });

// location.query()
//     .then(location => {
//         console.log(location[0]);
//     })
//     .catch((err)=>{
//         console.log(err);
//         throw err;
//     })
//     .finally(()=>{
//         knex.destroy();
//     });
state.query()
    .then(state => {
        console.log(state[0]);
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })
    .finally(()=>{
        knex.destroy();
    });