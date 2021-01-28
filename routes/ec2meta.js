var express = require('express');
var router = express.Router();
var request = require('request');
//var async = require('async');
//var ip = require('ip');

// const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
  var metadata = require('node-ec2-metadata');
  var insId;
  var publicIP;

  metadata.getMetadataForInstance('instance-id')
  .then(function(instanceId) {
      console.log("Instance ID: " + instanceId);
      insId = instanceId;
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });

  metadata.getMetadataForInstance('public-ipv4')
  .then(function(publicIp) {
      console.log("Public IP: " + publicIp);
      publicIP = publicIp;
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });

  res.json([{
    id: 'public_ip',
    value: publicIP,
  }, {
    id: 'instance_id',
    value: insId,
  }]);
});

module.exports = router;