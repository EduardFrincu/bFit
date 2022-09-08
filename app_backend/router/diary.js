
const router = require('express').Router();
const createDiary = require('../controllers/diaryController').createDiary;
const createEntryForToday = require('../controllers/diaryController').createEntryForToday;
const getDiary = require('../controllers/diaryController').getDiary;
const getDiaryHistory = require('../controllers/diaryController').getDiaryHistory;
const deleteDiaryLog = require('../controllers/diaryController').deleteDiaryLog;
const verifyToken = require('../controllers/verifyTokenController').verifyToken;

router.post('/createDiary', [verifyToken], createDiary);
router.post('/createEntry', [verifyToken], createEntryForToday);
router.get('/diary/:diaryId', [verifyToken], getDiary);
router.get('/diaryHistory', [verifyToken], getDiaryHistory);
router.delete('/deleteDiaryLog/:foodId/:mealEntryId', [verifyToken], deleteDiaryLog);

module.exports = router;