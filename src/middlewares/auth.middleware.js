import { asyncHandler } from "../utils/asyncHandler";

const auth = asyncHandler(async(req, res, next)=>{
  token = req.cookies.accessToken
});