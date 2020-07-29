const express = require('express');
const axios = require('axios');

const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

pss_username = process.env.PSS_USERNAME
pss_password = process.env.PSS_PASSWORD

router.get('/', function(req, res) {
    res.render('index')
  });
  
router.get('/pssLookup', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios({
        url: 'https://big-dipper-api.apps.lab1.ocp.bandwidth.com/v2/registries/query',
        method: 'post',
        headers:{  
            "content-type": "application/json"
        },
        auth: {
            username: pss_username,
            password: pss_password
          },
        data: {
            "tns": [
                req.query.phoneNumber
            ]}
    }).then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error.response.status);
        res.sendStatus(error.response.status);
      });
});

module.exports = router;