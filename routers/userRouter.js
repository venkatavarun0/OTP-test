
const router=require('express').Router();
const {signUp,verifyOtp}=require('../controllers/usercontroller');
router.route('/signup')
.post(signUp);
router.route('/verifyotp')
.post(verifyOtp);

module.exports=router;