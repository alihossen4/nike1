import e from 'express'
import { signin, signup, verifyMail } from '../controllers/user/user.controller.js'
import validationMiddleware from '../middlewares/validation.middleware.js';
import {userSignupSchema}  from '../validators/user.validator.js';

const router = e.Router();
router.post("/users/signup",validationMiddleware(userSignupSchema), signup);
router.get("/users/signin",validationMiddleware(userSignupSchema), signin);
router.get("/users/signin/data", signin);
router.get("/users/verify/", verifyMail);

// {
//     // console.log(req.body);
//     // res.json({ message: 'Data received successfully', data: req.body });
// }
router.post('/submit', (req, res) => {
    console.log(req.body); // Logs the parsed request body
    res.json({ message: 'Data received successfully', data: req.body });
  });

export default router