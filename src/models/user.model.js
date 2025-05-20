import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique: true
        },
        name : {
            type : String,
            required : true,
        },
      
        email : {
            type : String,
            required : true,
            unique: true
        },
        password : {
            type : String,
            required : true,
        },
        isVerified : {
            type: Boolean,
            default : false
        },
        passwordResetToken: {
            type : String,
            default : null
        },
        passwordResetExpires : {
            type: Date,
            default : null
        },
        status : {
            type : String,
            required : ['active', 'inactive', 'suspended'],
            default: 'active'
        },
    },
    {timestamps : true}
);
export const User = mongoose.model.User || mongoose.model('User', userSchema)