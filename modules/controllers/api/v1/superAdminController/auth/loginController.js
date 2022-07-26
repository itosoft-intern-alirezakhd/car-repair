import InitializeController from './initializeController.js'
import jwt from 'jsonwebtoken'

export default new(class loginController extends InitializeController {

    async login(req, res, next) {
        try {
            let {username,expiresIn,password} = req.body;
            let superAdmin = await this.model.User.findOne({username});
            if (!expiresIn) expiresIn = 36000;
            if (!superAdmin) return this.abort(res,403,null , 'Username does not exist')
            if (!superAdmin.active) return this.abort(res,403,null , 'User not activated')
            const validPassword = await this.helper.validatePassword(password, superAdmin.password);
            if (!validPassword) return this.abort(res,403,null , 'Password is not correct');
            const accessToken = jwt.sign({
                userId: superAdmin._id
            }, process.env.JWT_SECRET, {
                expiresIn: expiresIn
            });
            await this.model.User.findByIdAndUpdate(superAdmin._id, {
                accessToken: accessToken
            })
            const role = await this.model.Role.findOne({
                userRef : superAdmin._id
            })
            const data = {
                status: 200,
                family: "SUCCESSFUL",
                data: accessToken,
                exp: jwt.decode(accessToken).exp,
                profile: {
                    name: superAdmin.name,
                    email: superAdmin.email
                },
                permissions: role.permissions,
            }
            return this.helper.response(res , null , null , 200 , data )
        } catch (error) {
            next(error);
        }
    };
    async loginWithOTP(req, res , next) {
        try {
            let {number , optionalLoginToken} = req.body;
           const data = await this.helper.otpGenerate(number);
           const {configToken, configVerify} = this.helper;
           const response = await this.helper.axios(configToken.method, configToken.url, configToken.headers, configToken.data)
           console.log(response);
           configVerify.headers["x-sms-ir-secure-token"] = response.data['TokenKey']
           const result = await this.helper.axios(configVerify.method,configVerify.url,configVerify.headers,data)
           console.log(result);
           await this.model.Otp.deleteMany({number: number})
           this.ok(res  , null , result.data.Message , result.data.IsSuccessful )
        } catch (error) {
            next(error)
        }
    };
    

})()