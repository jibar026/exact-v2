var express = require('express');
var router = express.Router();
const axios = require('axios')

const url = "http://169.254.169.254/latest/meta-data/"
/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        const response = axios.get(url)
        const data = response.data
        console.log(data)
        res.send(json(data))
      } catch (error) {
        console.log(error)
      }
});

module.exports = router;