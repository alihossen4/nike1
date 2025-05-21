import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from "../../models/user.model.js";
import ApiError from '../../utils/apiError.js';
// const asyncHandler = (fn) =>(req, res, next ) => Promise.resolve(fn(req, res, next)).catch(err => next(err))
const signup = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {username, name, email, password} = req.body;
  const userExist = await User.findOne({username});
  if(userExist){
    throw ApiError.badRequest({success: false, message: "User already exists"});
  }
  const emailExist = await User.find({email});
  if(emailExist){
    throw ApiError.badRequest({success: false, message: "Email already exists"});
  }
  const user = await User.create({ username, name, email, password});
  // const user = await User.create(req.body);
  console.log(user);
  
  return res.status(200).json( {user});
});

export { signup };
 