const settings = require("./settings");

// creating object with details for connection
const client = {
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.host,
  port : settings.port,
  ssl : settings.ssl
};

var knex = require('knex')({
  client: 'pg',
  connection: client
});
//collect command line argument for input.
var input = process.argv.slice(2);

//arguments as input parameter and callback function.
function insertFamousPerson(details,callback) {
  //select statement with callback function.
  knex('famous_people').insert({first_name : details[0] , last_name : details[1] , birthdate : details[2]}) .asCallback(function(err) {
    if(err) {
      return console.log("err in insert : ", err);
    }
    console.log("inserted successfully");
     knex.destroy(() => {
      console.log("connection closed");
    });
  });
}

//call function that performs select operation with input if success calls callback functon.
insertFamousPerson(input,(err) => {
  if(err) {
    console.log(err);
  }
});

