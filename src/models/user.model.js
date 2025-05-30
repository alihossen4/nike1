import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES, JWT_EXPIRES, JWT_SECRET, RESFRESH_TOKEN_EXPIRES, RESFRESH_TOKEN_SECRET } from "../constants.js";
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
userSchema.pre('save', async function (next) {
    if(!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.jwtToken = function(){
    return jwt.sign(
        { id: this._id, username:this.username, email: this.email },
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES}
    );
};
userSchema.methods.accessToken = function(){
    return jwt.sign({id:this._id, username: this.username, email:this.email}, ACCESS_TOKEN,{
        expiresIn: ACCESS_TOKEN_EXPIRES
    })
}  
userSchema.methods.refreshToken = function(){
    return jwt.sign({id:this._id, username: this.username, email:this.email}, RESFRESH_TOKEN_SECRET,{
        expiresIn: RESFRESH_TOKEN_EXPIRES
    })
}  
export const User = mongoose.model.User || mongoose.model('User', userSchema)