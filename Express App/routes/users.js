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
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(BodyParser.text());

/*
app.use(function(res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

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

router.post('/registerform', (req, res) => {
  //console.log(req.body);
  var mdata = JSON.parse(req.body.memdetail);
//console.log(req.params);
  console.log('Member ID from UI' + mdata.memid);
  console.log('Chapter ID from UI' + mdata.chapid);
  console.log('Role ID from UI' + mdata.roleid);
  console.log('First name of the member from UI' + mdata.fname);
  console.log('Last name of the member from UI' + mdata.lname);
  console.log('Email1 of the member from UI' + mdata.em1);
  console.log('Email2 of the user from UI' + mdata.em2);
  console.log('Ph1 of member from UI' + mdata.ph1);
  console.log('Ph2 of member from UI' + mdata.ph2);

  res.locals.connection.query("INSERT into iif_chap_mem_detail(mem_id, chap_id, role_id, chap_mem_name_first, chap_mem_name_last, chap_mem_email1, chap_mem_email2, chap_mem_phone1, chap_mem_phone2) VALUES ('"
  +mdata.memid+"','"+mdata.chapid+"','"+mdata.roleid+
  "','"+mdata.fname+"','"+mdata.lname+"','"+mdata.em1+"','"+mdata.em2+
  "','"+mdata.ph1+"','"+mdata.ph2+"');", function(error, results, fields)
  {
    if(error)
    throw error;
    else{
    console.log('Row Inserted');
    res.sendStatus(200);
    }
  } );
})

router.post('/calmenu', (req,res) => {
  var udata = JSON.parse(req.body.lgndetail);
  console.log(udata);
res.locals.connection.query("SELECT iif_chap_mem_detail.mem_id, chap_id, chap_mem_name_first from iif_chap_mem_detail INNER JOIN iif_login_detail ON iif_chap_mem_detail.mem_id=iif_login_detail.mem_id WHERE "+
"iif_login_detail.username='"+udata.usrnm+"';",
     function (error, results, fields) {
      if(error) {throw error}
      else{
        //console.log('Login Results:'+results[0].mem_id);
        Object.keys(results).forEach(function(key) {
          var row = results[key];
          var resData = {mem_id: row.mem_id,
          chap_id: row.chap_id,
          //role_id: row.chap_id,
          chap_mem_name_first: row.chap_mem_name_first         
        }
        console.log(resData)
        res.send(JSON.stringify(resData));
        });
      }
  });
  //res.sendStatus(200)
});

router.post('/calender', (req, res) => {
  console.log(req.body.chname)
  var chapter = JSON.parse(req.body.chname)
  res.locals.connection.query("SELECT ev_id, ev_name, ev_desc, ev_date_from, ev_date_to from iif_ev_detail WHERE chap_id = " + req.body.chname + " AND ev_visible = 'Y'", function (error, results, fields) {
      if(error) {throw error}
      else{
      console.log(results[0].ev_date_from.getFullYear());
      res.send(results);
      }
  });
});

router.get('/adminview', function(req, res, next) {
  res.locals.connection.query("SELECT * from iif_chap_mem_detail WHERE chap_mem_visible = 'Y'", function (error, results, fields) {
      if(error) throw error;
      console.log(results);
      res.send(JSON.stringify(results));
  });
});

router.post('/adminview/delete', function(req, res, next) {
  var delDetail = JSON.parse(req.body.ddetail)
  console.log(delDetail)
 res.locals.connection.query('UPDATE iif_chap_mem_detail SET chap_mem_visible="N" where mem_id = "'+delDetail.mem_id+'";', function (error, results, fields) {
      if(error) {throw error;}
      else{
        res.locals.connection.query('SELECT * from iif_chap_mem_detail WHERE chap_mem_visible="Y";', function (error, result, fields) {
          if(error) {throw error;}
          else{  
            /*var finalData = []
            Object.keys(result).forEach(function(key) {
              var i = 0;
              var row = result[key];
              var resData = {mem_id: row.mem_id,
              chap_id: row.role_id,
              role_id: row.chap_id,
              chap_mem_name_first: row.chap_mem_name_first,
              chap_mem_name_last: row.chap_mem_name_last,
              chap_mem_email1: row.chap_mem_email1,
              chap_mem_email2: row.chap_mem_email2,
              chap_mem_phone1: row.chap_mem_phone1,
              chap_mem_phone2: row.chap_mem_phone2            
            }
            finalData[i++] = resData;
            });
            //Array.from(results)
            console.log(finalData)
          res.send(JSON.stringify(finalData));*/
          console.log(result)
          res.send(JSON.stringify(result))
          }
        });
      }
  });
});


router.get('/edit', function(req, res, next) {
  res.locals.connection.query('update members set chap_id ='+req.body.chap_id+' where id = '+req.body.mem_id+';', function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/createevent', function(req,res) {
  var edata = JSON.parse(req.body.edetail);
  console.log(edata);
  console.log('Chapter Ids: ' + JSON.stringify(edata.chap_id))
  var currEvId = edata.ev_id;
  for(var i in edata.chap_id)
  {
    console.log(i);
    var currChapId = edata.chap_id[i];
    
  res.locals.connection.query("INSERT into iif_ev_detail(ev_id, chap_id, ev_desc, ev_name, ev_date_from, ev_date_to, ev_status) VALUES ('" 
  + currEvId + "', '" + currChapId +  "', '" + edata.ev_desc + "', '" + edata.ev_name + "', STR_TO_DATE('" + edata.ev_date_from + "', '%Y/%m/%d %H:%i:%s'), STR_TO_DATE('" + edata.ev_date_to
  + "', '%Y/%m/%d %H:%i:%s'), '" + edata.ev_status + "');",
  function(error, results, fields){
  if (error)
     throw error;
     else{
    console.log('Row Inserted.');
     }
    }
  );
  currEvId++;
}
res.sendStatus(200);
});
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  connection.query('SELECT * from iif_chap_mem_detail', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});*/
}
module.exports = router;
