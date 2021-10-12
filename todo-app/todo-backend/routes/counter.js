const express = require('express');

const router = express.Router();

// 12.10
const redis = require('../redis')

// 12.10
router.get('/', async (req, res) => {

  const value = await redis.getAsync('key');

  const statistics = {'added_todos': value};

  console.log('statistics', statistics, value);

  res.json(statistics);
});

module.exports = router;
