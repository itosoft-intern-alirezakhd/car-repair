import emailRegex from 'email-regex'
import InitializeController from './initializeController.js'; 
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator';
import Otp from '../../../../../models/otp-model.js';
import bcrypt from 'bcrypt'
import { data } from 'cheerio/lib/api/attributes.js';


export default new(class RegisterController extends InitializeController {
    //save user => create otp => send otp sms => verify otp => active user
    async signUp  (req, res, next)  {
        try {
            const {name,username,email,password,contact,mobile} = req.body;
            const role = "admin"
            if (!emailRegex({
                        exact: true
                    }).test(email)) return this.abort(res , 401 , null , "ایمیل با فرمت درست وارد شود" ) 

            let hashedPassword
            if (password) hashedPassword = await this.helper.hashPassword(password);
            else hashedPassword = "undefined"
            const newAdmin = new this.model.User({
                name,
                username,
                contact,
                email,
                password: hashedPassword,
                active: false,
                mobile: mobile,
                role : {role}
            });
            newAdmin.accessToken = jwt.sign({
                userId: newAdmin._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            // const result = await this.model.Role.findOne({userRef : newUser._id})
            // if (!result) new this.model.Role({role}).save()
            
            // const roleObj = await this.model.Role.findOne({role : role});
            // newAdmin.role = roleObj._id;

            new this.model.Role({
                role,
                userRef : newSuperAdmin._id,
                permissions : this.helper.superAdminPermissions
            }).save()

            newAdmin.save(async (err, user) => {
                if (err) {
                    let message = "";
                    if (err.errors.username) message = `${err.errors.username} `;
                    if (err.errors.email) message += `${err.errors.email} `;
                    if (err.errors.password) message += `${err.errors.password}`;
                    if (err.errors.mobile) message += `${err.errors.mobile}`;
                    message = message.trim();
                    return this.abort(res , 401 , null , message ) 
                } else {
                    //handle verify acc
                    //send otp verfication
                    this.helper.sendOtp(newAdmin._id , newAdmin.mobile, res);
                
                    // await this.model.Otp.deleteMany({
                    //     number: otp.number
                    // })
                    // return this.ok(res , 200 , null , "User registrations is successful.") 
                }
            });
        
        } catch (error) {
            next(error)
        }
    };
})()