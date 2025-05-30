import e from 'express'
import { signin, signout, signup, verifyMail } from '../controllers/user/user.controller.js'
import validationMiddleware from '../middlewares/validation.middleware.js';
import {userSignupSchema}  from '../validators/user.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = e.Router();
router.post("/signup",validationMiddleware(userSignupSchema), signup);
router.get("/signin",validationMiddleware(userSignupSchema), signin);
router.get("/signin/data", signin);
router.get("/verify/", verifyMail);
router.get('signout', auth, signout)
// {
//     // console.log(req.body);
//     // res.json({ message: 'Data received successfully', data: req.body });
// }
router.post('/submit', (req, res) => {
    console.log(req.body); // Logs the parsed request body
    res.json({ message: 'Data received successfully', data: req.body });
  });

export default router