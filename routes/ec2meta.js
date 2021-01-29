var express = require('express');
var router = express.Router();
var Q = require('q');
router.get('/', function(req, res, next) {
  var metadata = require('node-ec2-metadata');

  Q.all([
      metadata.getMetadataForInstance('instance-type'),
      metadata.getMetadataForInstance('instance-id'),
      metadata.getMetadataForInstance('ami-id'),
      metadata.getMetadataForInstance('hostname'),
      metadata.getMetadataForInstance('public-hostname'),
      metadata.getMetadataForInstance('public-ipv4'),
      metadata.getMetadataForInstance('local-ipv4'),

  ])
  .spread(function(type, instanceID, amiID, hostname, publicHostname, publicIPv4, localIPv4) {
      res.json(
        {
          IP: publicIPv4,
          Metas:
                [
                  {
                  id: "Instance Type",
                  value: type
                },
                {
                  id: "Instance ID",
                  value: instanceID
                },
                {
                  id: "AMI-ID",
                  value: amiID
                },
                {
                  id: "Public IPv4",
                  value: publicIPv4
                },
                {
                  id: "Private IPv4",
                  value: localIPv4
                },
                {
                  id: "Hostname",
                  value: hostname
                },
                {
                  id: "Public Hostname",
                  value: publicHostname
                }
               ]
      });
  })
  .fail(function(error) {
      console.log("Error: " + error);
  });
});

module.exports = router;