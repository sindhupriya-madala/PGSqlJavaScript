const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.host,
  port : settings.port,
  ssl : settings.ssl
});
var input = process.argv[2];

function selectPeopleWithLastname(lastname, done) {
  client.connect((err) => {
    if(err) {
     return console.log("Error in Connection : ",err);
    }
    client.query("SELECT * from famous_people where last_name = $1::text",[lastname],(error, result) => {
     if(error) {
        return console.error("error running query : ", error);
      }
    done(result.rows[0]);
    //console.log(result.rows[0]);
    client.end();
    });
  });
};


selectPeopleWithLastname(input,(err,row) => {
  if(err) {
    console.log(err);
  }
  console.log(row);
})