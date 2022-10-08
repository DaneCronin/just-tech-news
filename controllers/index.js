const router = require('express').Router();
const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

//catches any endpoints if they do not exist and returns 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;