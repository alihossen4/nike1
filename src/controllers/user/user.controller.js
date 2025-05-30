import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from "../../models/user.model.js";
import ApiError from '../../utils/apiError.js';
import ApiSuccess from '../../utils/apiSuccess.js';
import { APP_URL, JWT_SECRET } from '../../constants.js';
import { sendMail, verifyEmail } from '../../utils/mail.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
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
  const verifyUrl = `${APP_URL}/api/v1/users/verify?token=${token}`;
   sendMail({
    email,
    subject: 'verify your email',
    mailFormat: verifyEmail(name, verifyUrl),
   })
  return res.status(200).json(ApiSuccess.created( "User created", user)); 
});
const verifyMail = asyncHandler(async (req, res) =>{
  const {token} = req.query;
  if(!token){
    throw ApiError.badRequest('Token is required')
  }
  const decodedToken = jwt.verify(token, JWT_SECRET);
  if(!decodedToken){
    throw ApiError.badRequest('Invalid token')
  }
  const user = await User.findById(decodedToken.id).select(
    '-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires'
  );
  if(!user){
    throw ApiError.notFound('User not found')
  }
  if(user.isVerified){
    return res.status(200).json(ApiSuccess.ok('User already verifid', user))
  }
  else{
    user.isVerified = true;
    await user.save();
    return res.status(200).json(ApiSuccess.ok('User verified', user))
  }
});

const signin = asyncHandler(async(req, res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw ApiError.notFound('Invalid credentials');
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    throw ApiError.notFound('Invalid credentials');
  }
  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();
  const cookieOptions = {
    httpOnly : true,
    secure: true,
    sameSite: 'strict',
  };

  return res
  .cookie('accessToken', accessToken, {...cookieOptions, maxAge: 24*60*60*1000})
  .cookie('refreshToken', refreshToken, {...cookieOptions, maxAge: 30*24*60*60*1000})
  .status(200).json(ApiSuccess.ok('User signed in', {accessToken, refreshToken}))
});

const signout = asyncHandler(async (_req, res) =>{
  return res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json(ApiSuccess.ok('User signed out'))
})
export { signup , verifyMail, signin, signout};
 //🦸🦸