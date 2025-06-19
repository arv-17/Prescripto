import jwt from 'jsonwebtoken'

const authUser = (req,res,next)=>{
    try {
        const token = req.headers['token']
        // console.log(admintoken)

        if(!token){
            return res.json({success:false,message:"Not Logged in"});
        }

        const token_decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.body = req.body || {}
        req.body.userId = token_decoded.userId

        next();

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

export default authUser;