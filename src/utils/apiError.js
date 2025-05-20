class ApiError extends Error {
    constructor(
        statusCode,
        message = 'something went wrong',
        errors = {},
        stack ='',
        errorCode = ''
    )
        {
        super(message);
        this.errors = errors;
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
    static unauthorized(message = "Unauthorized",errors = {},errorCode = 'AUTH_401'){
        return new ApiError(401, message, errors, '', errorCode)
    }
    static forbidden(message= 'Forbidden', errors ={}, errorCode='AUTH_403'){
        return new ApiError(403, message,errors,'',errorCode)
    }
    static badRequest(message='Bad Request', errors={}, errorCode='REQ_400'){
        return new ApiError(400, message,errors,'',errorCode)
    }
    static notFound(message='Not Found', errors={}, errorCode='REQ_404'){
        return new ApiError(404, message,errors,'',errorCode)
    }
    static conflict(message='Conflict', errors={}, errorCode='REQ_409'){
        return new ApiError(409, message,errors,'',errorCode)
    }
    static serverError(message='Internal server error', errors={}, errorCode='SERVER_500'){
        return new ApiError(500, message,errors,'',errorCode)
    }
    static databaseError(message='Database error', errors={}, errorCode='DB_500'){
        return new ApiError(500, message,errors,errorCode)
    }
    static custom(statusCode,message, errors={}, stack = '', errorCode=''){
        return new ApiError(statusCode, message,errors,stack,errorCode)
    }
}
export default ApiError;
