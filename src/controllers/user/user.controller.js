import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from "../../models/user.model.js";
import ApiError from '../../utils/apiError.js';
import ApiSuccess from '../../utils/apiSuccess.js';
import { APP_URL } from '../../constants.js';
import { sendMail, verifyEmail } from '../../utils/mail.js';

// const asyncHandler = (fn) =>(req, res, next ) => Promise.resolve(fn(req, res, next)).catch(err => next(err))
const signup = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {username, name, email, password} = req.body;
  const userExist = await User.findOne({username});
  if(userExist){
    throw ApiError.badRequest({success: false, message: "User already exists"});
  }
  const emailExist = await User.findOne({email});
  if(emailExist){
    throw ApiError.badRequest({success: false, message: "Email already exists"});
  }
  const userCreated = await User.create(
    { username, 
      name, 
      email, 
      password
    }
  );
  // const er = await User.create(req.body);  
  const user = await User.findById(userCreated._id).select(
    '-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires'
  ) 

  const token = userCreated.jwtToken();
  const verifyUrl = `${APP_URL}/api/v1/users/verify/?token=${token}`;
   sendMail({
    email,
    subject: 'verify your email',
    mailFormat: verifyEmail(name, verifyUrl),
   })
  return res.status(200).json(ApiSuccess.created( "User created", user)); 
});


export { signup };
 //🦸🦸