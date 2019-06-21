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
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

{
    router.post('/registerform', (req, res) => {
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
}