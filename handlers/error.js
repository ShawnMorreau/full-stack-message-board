function errorHandler(err,req,res,next){
    return res.status(err.status || 500).json({
        error: `${err.message}` || "Oops, that's awkward... it's us not you \n"
    });
}

module.exports=errorHandler;