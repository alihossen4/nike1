class ApiSuccess {
    constructor(statusCode= 200, message = 'Success', data= {}, meta = {}){
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
    static ok(data = {}, message = 'Ok', meta = {}){
        return new ApiSuccess(200,message, data, meta)
    }
    static created(data = {}, message = 'Resource Created', meta = {}){
        return new ApiSuccess(201,message, data, meta)
    }
    static noContent( message = 'No Content'){
        return new ApiSuccess(204,message)
    }
    static custom(statusCode,data = {}, message = 'Ok', meta = {}){
        return new ApiSuccess(statusCode,message, data, meta)
    }
}
export default ApiSuccess;