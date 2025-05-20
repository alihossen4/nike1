const asyncHandler = fn => 
(req, res, next) => Promise.resolve(fn(req, res, next))
.catch(err => next(err));
// const asyncHandler = (fn) =>{
//     return function(req,res, next){
//         fn(req, res, next)
//         // next()
//     }
// }

export {asyncHandler}