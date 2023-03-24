const express = require('express');
const { erdView, erdView2 } = require('../controllers/erdController');

var path = require('path');

const router = express.Router();

router.get('/erd_pkg', erdView2);
router.get('/erd_local', erdView);

router.get('/vuerd-master/packages/vuerd/dist/vuerd.min.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../vuerd-master/packages/vuerd/dist/vuerd.min.js'));
});

module.exports = router;