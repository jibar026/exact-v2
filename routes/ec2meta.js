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
    res.json([{
      id: 'public_ip',
      value: metadata.getMetadataForInstance('public-ipv4'),
    }, {
      id: 'hostname',
      username: metadata.getMetadataForInstance('hostname'),
    }]);
    // metadata.getMetadataForInstance('ami-id'),
    // metadata.getMetadataForInstance('public-hostname'),
    
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });
});

module.exports = router;