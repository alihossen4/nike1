import zod, {ZodError } from "zod";
import ApiError from "../utils/apiError.js";

function validationMiddleware(schema){
    return async (req, res, next) => {
        try { 
            const validateData = schema.parse(req.body);
            req.body = validateData;
            next();
        } catch (error) {
            if(error instanceof ZodError){
                const formatedError = error.errors.map( err =>({
                    field: err.path[0],
                    message: err.message,
                }));
                throw ApiError.badRequest("Validation Error :", formatedError);
                // return res.status(400).json({success : false, errors: error})
            }
            else{
                throw ApiError.serverError(error.message)
            }
        }
    }
}
export default validationMiddleware;