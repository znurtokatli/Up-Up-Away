
// // get the client
// const {Client} = require('pg');
// const client = new Client({
//     user: "postgres",
//     password: "#babyHugo17",
//     host: "localhost",
//     port: 5432,
//     database: "aviation"
// })
// // create the connection to database

// airports = client.connect()
// .then(()=> console.log("Connected successfully"))
// .then(() => client.query("SELECT * from airports"))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())

// airlines = client.connect()
// .then(()=> console.log("Connected successfully"))
// .then(() => client.query("SELECT * from airlines"))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())

const {Dataset} = require('data.js')

const path = 'https://datahub.io/core/geo-countries/datapackage.json'

