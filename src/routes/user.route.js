import e from 'express'
import { signup } from '../controllers/user/user.controller.js'
import validationMiddleware from '../middlewares/validation.middleware.js';
import {userSignupSchema}  from '../validators/user.validator.js';

const router = e.Router();
router.post("/users/signup",validationMiddleware(userSignupSchema), signup);

// {
//     // console.log(req.body);
//     // res.json({ message: 'Data received successfully', data: req.body });
// }
router.post('/submit', (req, res) => {
    console.log(req.body); // Logs the parsed request body
    res.json({ message: 'Data received successfully', data: req.body });
  });

export default router