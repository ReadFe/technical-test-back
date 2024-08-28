const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const controller = require('./controller');

router.get('/', verifyToken, controller.index)
router.put('/:id',verifyToken, controller.update)
router.post('/',verifyToken, controller.store)
router.delete('/:id',verifyToken, controller.destroy)

module.exports = router;