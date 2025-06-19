import jwt from 'jsonwebtoken'

const authDoctor = (req,res,next)=>{
    try {
        const dToken = req.headers['dtoken']
        // console.log(admintoken)

        if(!dToken){
            return res.json({success:false,message:"Not Logged in"});
        }

        const token_decoded = jwt.verify(dToken,process.env.JWT_SECRET)

        req.body = req.body || {}
        req.body.docId = token_decoded.id

        next();

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

export default authDoctor;