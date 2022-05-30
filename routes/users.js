var express = require('express');
var router = express.Router();

const jwt = require('../config/jwt-util');
const redisClient = require('../config/redis');
const refresh = require('../config/refresh');
const authJwt = require('../config/authJWT');

/* GET users listing. */
router.get('/', function(req, res, next) {

  var user = {
    id: 'hyeminkim',
    role: 'admin'
  };

  const accessToken = jwt.sign(user);
  const refreshToken = jwt.refresh();

  redisClient.set(user.id, refreshToken);

  res.json({
    resultCode: '0200',
    resultMessage: 'login success',
    resultData: {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  })
});

router.get('/profile', authJwt, function (req, res, next) {
  console.log(req.id);
  console.log(req.role);

  res.json({
    resultCode: '0200',
    resultMessage: 'prifle success',
  })
});

router.get('/refresh', refresh);

module.exports = router;
