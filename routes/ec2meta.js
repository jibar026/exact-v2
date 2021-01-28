var express = require('express');
var router = express.Router();
var request = require('request');
//var async = require('async');
//var ip = require('ip');

// const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
  var metadata = require('node-ec2-metadata');

  metadata.getMetadataForInstance('public-ipv4')
  .then(function(ip) {
      console.log("Instance IP: " + ip);
      res.send(ip)
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });
});

module.exports = router;