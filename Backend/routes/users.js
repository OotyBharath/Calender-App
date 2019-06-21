var express = require('express'),
app = express(),
BodyParser = require('body-parser');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var logger = require('morgan');
var router = express.Router();
app.use(logger('dev'));
app.use(BodyParser.raw());
var path = require ('path');
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(BodyParser.text());


app.use(function(res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//res.locals.connection.query('insert into members(name,email) values(''+req.body.name+'',''+req.body.email+'')', function(){});
{
router.post('/', (req, res) => {
  var data = JSON.parse(req.body.detail);
//Fetching data from the database.
usrnm = data.name;
usrpswd = data.pass;
console.log('Username from UI:' + data.name);
console.log('Password from UI:' + data.pass);
{
res.locals.connection.query("SELECT password from iif_login_detail WHERE username like  CAST('" +data.name+"' AS CHAR);",
  function(error, results, fields){
  if (error)
     throw error;
  //Comparing data from UI and DB.
  if(results[0].password == data.pass)
  {
    console.log('Password fetched from database:' + results[0].password);
    res.sendStatus(200);
    console.log('Status sent.');
  }
    }
  );
}
});
/*
router.get('/', (req, res) => {
  console.log(status);
  res.send(status);
});*/
}
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  connection.query('SELECT * from iif_chap_mem_detail', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});*/

module.exports = router;
