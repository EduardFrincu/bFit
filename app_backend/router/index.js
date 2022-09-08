const router = require('express').Router()
const auth = require('./auth');
const api = require('./api');
const diary = require('./diary');
const verifyToken = require('../controllers/verifyTokenController').verifyToken;
const MealPlanCreate = require('../controllers/mealPlanController').createMealPlan;
const viewMealPlans = require('../controllers/mealPlanController').getMealPlansByUserId;
const updateUserProfile = require('../controllers/BMRController').updateProfile;
const MealPlanDelete = require('../controllers/mealPlanController').deleteMealPlanById;
const getMealPlanByCalories = require('../controllers/mealPlanController').getMealPlanByCalories;
const saveMealPlan = require('../controllers/mealPlanController').saveMealPlan;
const insertUserLog = require('../controllers/userLogController').insertUserLog;
const getWeightLog = require('../controllers/userLogController').getWeightLog;
router.get('/', verifyToken,(req, res) =>{
    user = req.user;
    return res.send(user);

})
router.post('/mealPlan',[verifyToken], MealPlanCreate);
router.get('/viewMealPlans', [verifyToken], viewMealPlans);
router.get('/getMealPlanByCalories', [verifyToken], getMealPlanByCalories);
router.post('/updateUserProfile', [verifyToken], updateUserProfile);
router.post('/saveMealPlan', [verifyToken], saveMealPlan);
router.post('/insertUserLog', [verifyToken], insertUserLog);
router.get('/getWeightLog', [verifyToken], getWeightLog);
router.delete('/deleteMealPlan/:mealPlanId', [verifyToken], MealPlanDelete);


router.use(api);
router.use(diary);

router.use(auth);
//router.use(verifyToken);

module.exports = router;