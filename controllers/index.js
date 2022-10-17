const router = require('express').Router();
const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//catches any endpoints if they do not exist and returns 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;