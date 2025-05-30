import { asyncHandler } from "../utils/asyncHandler";
import {User} from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN} from '../constants.js'
const auth = asyncHandler(async(req, res, next)=>{
  const token = await req.cookies.accessToken || res.header('Authorization').replace('Bearer', '');
  if(!token){
    throw ApiError.unauthorized('You are not logged in');
  }
  const decodedToken = jwt.verify(token, ACCESS_TOKEN);
  if(!decodedToken){
    throw ApiError.unauthorized('You are not logged in')
  }
  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
});           

export default auth;