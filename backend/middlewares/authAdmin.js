import jwt from 'jsonwebtoken'

const authAdmin = (req,res,next)=>{
    try {
        const aToken = req.headers['atoken']
        // console.log(admintoken)

        if(!aToken){
            return res.json({success:false,message:"Not Logged in"});
        }

        const token_decoded = jwt.verify(aToken,process.env.JWT_SECRET)

        if(token_decoded.email!==process.env.ADMIN_EMAIL || token_decoded.password!==process.env.ADMIN_PASSWORD){
           return res.json({success:false,message:"Not authorized login again"});
        }

        next();

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

export default authAdmin;