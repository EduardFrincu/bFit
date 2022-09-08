const router = require('express').Router();
const login = require('../controllers/authController').login;
const register = require('../controllers/authController').register;
const {validate} = require('../validators');
const {rules:registrationRules} = require('../validators/auth/register');
const {rules:loginRules} = require('../validators/auth/login');

 router.post('/login',[loginRules, validate], login)
//(request, response) =>{
//     console.log(request.body);
//     //return response.send(request.body);
//     return response.status(200).json({
//         nume: request.body.username,
//         parola: "pass"
//     });

// })

router.post('/register', [registrationRules,validate] ,register);
// (request, response) =>{
//     request.body.password = bcrypt.hashSync(request.body.password,10);
//     return response.status(200).json(request.body);

// })
//router.post('/verify', verifyToken)
module.exports = router;