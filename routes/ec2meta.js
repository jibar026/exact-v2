var express = require('express');
var router = express.Router();
var request = require('request');
//var async = require('async');
//var ip = require('ip');

// const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
  var metadata = require('node-ec2-metadata');
  Q.all([
    metadata.getMetadataForInstance('ami-id'),
    metadata.getMetadataForInstance('hostname'),
    metadata.getMetadataForInstance('public-hostname'),
    metadata.getMetadataForInstance('public-ipv4'),
  ])
  .spread(function(amiID, hostname, publicHostname, publicIPv4) {
      console.log("AMI-ID: " + amiID);
      console.log("Hostname: " + hostname);
      console.log("Public Hostname: " + publicHostname);
      console.log("Public IPv4: " + publicIPv4);
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });
});

module.exports = router;