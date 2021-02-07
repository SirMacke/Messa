const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

router.get('/', (req, res) => {
  const decryptedString = cryptr.decrypt(req.query.hashedCode);

  res.status(200).json(decryptedString);
});

router.post('/', (req, res) => {
  const encryptedString = cryptr.encrypt(req.body.morseCode);
  
  res.status(200).json(encryptedString);
});

module.exports = router;