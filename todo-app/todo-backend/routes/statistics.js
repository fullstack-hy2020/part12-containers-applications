const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis/index')

/*Get statistics. */
router.get('/', async (req, res) => {
  const stats = getAsync('added todos')
  res.status(200).send(stats)
})

module.exports = router;