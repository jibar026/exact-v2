var express = require('express');
var router = express.Router();
var request = require('request');
//var async = require('async');
//var ip = require('ip');

// const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
  var metadata = require('node-ec2-metadata');

  metadata.getMetadataForInstance('instance-id')
  .then(function(instanceId) {
      console.log("Instance ID: " + instanceId);
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });
  res.json(metadata);
});

module.exports = router;