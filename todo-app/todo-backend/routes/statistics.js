const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis/index')

/*Get statistics. */
router.get('/', async (req, res) => {
  const stats = await getAsync('added_todos')
  res.send(stats)
})

module.exports = router;