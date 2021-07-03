const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();


router.get('/', (req, res) => {
  res.send({ title: 'Chia Farming' });
});

router.post('/protected', authenticate, (req, res) => {
  res.send({ title: 'Display only when logged in!', user: req.payload.userId });
});

module.exports = router;
