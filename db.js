
const knex = require('knex')({
    client: 'pg',
    connection: {
    host: 'faraday.cse.taylor.edu',
    user: 'tim_swanson',
    password: 'wijenara',
    database: 'tim_swanson'
     }
 });

 

 knex
     .select('firstname')
     .from('driver')
     .then(result => console.log(result))
     .then(() => knex.destroy());