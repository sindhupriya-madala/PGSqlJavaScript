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
var input = process.argv[2];

//arguments as input parameter and callback function.
function selectPeopleWithLastname(lastname,callback) {
  //select statement with callback function.
  knex.select().from('famous_people').where('last_name', lastname).asCallback(function(err, rows) {
    if(err) {
      return console.log("err in select : ", err);
    }
    // calling callback with output rows.
    callback(rows);
    //closing the connection and confirming in callback weather connection closed or not.
    knex.destroy(() => {
      console.log("connection closed");
    });
  });
}

//function for printing output in console.
function printRow(outputRows) {
  for(var row in outputRows) {
    console.log(row);
  }
}

//call function that performs select operation with input if success calls callback functon.
selectPeopleWithLastname(input,(err,printRow) => {
  if(err) {
    console.log(err);
  }
});

