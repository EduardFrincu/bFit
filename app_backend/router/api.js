const Food = require('../models').Food;
const router = require('express').Router()
const verifyToken = require('../controllers/verifyTokenController').verifyToken;
const getUserInfo = require('../controllers/BMRController').getUserInfo;
const getUserHistoryDataByDate = require('../controllers/diaryController').getUserHistoryDataByDate;
const calculateMacros = require('../controllers/diaryController').calculateMacros;


router.get('/api/foods', async (req,res) => {
    const foods = await Food.findAll({
        attributes: ['name']
    });
    res.send(foods);
})

router.get('/api/user', [verifyToken], getUserInfo)
router.get('/api/calculateMacros/:goal/:intake', [verifyToken], calculateMacros)
router.get('/api/userHistory/:date', [verifyToken], getUserHistoryDataByDate)

module.exports = router;