const router = require('express').Router();

const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validations');

router.get('/me', getUser);
router.patch('/me', updateUserValidation, updateUserInfo);

module.exports = router;
