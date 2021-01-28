var express = require('express');
var router = express.Router();
var request = require('request');
//var async = require('async');
//var ip = require('ip');

// const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = 'http://169.254.169.254/latest/meta-data/public-ipv4';
	//var count = 5;
  //var publicIP;
  request.get(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      return body;
    }
    else{
      return err;
    }
  });
});

module.exports = router;