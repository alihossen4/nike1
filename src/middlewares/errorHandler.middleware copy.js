import ApiError from "../utils/apiError.js";
import NODE_ENV from './constants'
const errorHandler = (err,req,res,next) =>{
    const {statusCode, message, errors, stack} = err;
    return res.status(statusCode ||500).json({
        success : false,
        statusCode : statusCode || 500,
        message,
        errors,
        errorCode,
        ...(NODE_ENV )
    })
    // const err1 = new Error("sometjing wrong",(er)=>{
    //     console.log(er)
    // })
    // console.log(err1);
    return res.json((ApiError.serverError(err.message, err.errors, err.statusCode)))
}

export default errorHandler;