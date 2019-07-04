var mysql = require('mysql');
var express=require('express');
const router = express.Router();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "iif_calender"
});

//app.set('port', process.env.PORT || 3001);
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM iif_chap_mem_detail", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
//[Environment]::SetEnvironmentVariable("DEBUG","express:*");
//[Environment]::SetEnvironmentVariable("PORT","express:3001"); & npm start
//SET DEBUG=my-cal:* & npm start



/*  "@fullcalendar/core": "^4.0.1",
  "@fullcalendar/daygrid": "^4.0.1",
  "@fullcalendar/interaction": "^4.0.1",*/