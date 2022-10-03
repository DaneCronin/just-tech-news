const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//catches any endpoints if they do not exist and returns 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;