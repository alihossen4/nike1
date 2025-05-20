import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from "../../models/user.model.js";
// const asyncHandler = (fn) =>(req, res, next ) => Promise.resolve(fn(req, res, next)).catch(err => next(err))
const signup = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {username, name, email, password} = req.body;
  const user = await User.create(req.body);
  console.log(user);
  
  return res.json( {user});
});

export { signup };
 