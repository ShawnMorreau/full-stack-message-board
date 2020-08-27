const jwt = require("jsonwebtoken");

//authentication
exports.checkUserAuthentication = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(decoded){
                return next();
            }else{
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        }); 
    }catch(e){
        return next({
            status: 401,
            message: "Please log in first"});
    }
}
//authorization
exports.checkUserAuthorization=function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(decoded && decoded.id === req.params.id){
                return next();
            }
            else{
                return next({
                    status:401,
                    message:"Unauthorized Request"
                })
            }
        });
    } catch (err) {
        return next(err);
    }
}