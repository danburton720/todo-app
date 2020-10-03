const express = require('express');

const router = new express.Router();

router.get('/todos', async (req, res) => {
    res.send("/todos endpoint working ok")
});

module.exports = router;