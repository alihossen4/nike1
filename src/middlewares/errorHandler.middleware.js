import ApiError from "../utils/apiError.js";
import {NODE_ENV} from "../constants.js"
const errorHandler = (err,req,res,next) =>{
    const {statusCode, message, errors, stack, errorCode} = err;
    return res.status(statusCode ||500).json({
        success : false,
        statusCode : statusCode || 500,
        message,
        errors,
        errorCode,
        ...(NODE_ENV === 'development' &&{stack}),
    });

}

export default errorHandler;