 import jwt from "jsonwebtoken";
 
 const authorize= async (req,res,next)=>{
    try {
       const token = req.headers.authorization.split(" ")[1];
       if(!token)return res.status(404).json({msg : "unauthorrized"});
       const user = await jwt.verify(token,process.env.JWT_SECRET)
       req.user=user;
       next()
    } catch (error) {
        console.log(error);   
     return res.status(404).json({msg : 'Unauthorized'})
    }
}
export {
    authorize
}