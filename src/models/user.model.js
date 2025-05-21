import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
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
})
export const User = mongoose.model.User || mongoose.model('User', userSchema)