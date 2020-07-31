const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(201).send(req.body);
});

router.get('/', (req, res) => {
  res.status(200).send(res.rows);
})
module.exports = router;