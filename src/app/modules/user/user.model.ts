
import { TUser, UserModel } from "./user.interface";
import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import config from "../../config";



const userSchema = new Schema<TUser,UserModel>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true, "Please, provide your email"],
        unique:true
      }  ,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        default: 'user'
    },
    isActivated:{
        type:Boolean,
        default:true
    },
    needsPasswordChange:{
      type:Boolean,
      default:true
    },
    passwordChangedAt:{
      type:Date
    }
},{timestamps:true})



// pre save middleware / hook
userSchema.pre('save', async function(next){

    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    
  next()
  })


  userSchema.post('save', function(doc, next) {
    doc.password = ''

    next()
  })


  userSchema.pre('find', function(next) {
    this.select('-password'); 
    next();
  });

  


  userSchema.statics.isUserExistsById= async function(id:string) {
    return await User.findById(id).select('+password');
  }

  userSchema.statics.isPasswordMached = async function(plainTextpassword, hashedPassword){
    return await bcrypt.compare(plainTextpassword, hashedPassword)
 }


 userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};



export const User = model<TUser,UserModel>('User',userSchema)

