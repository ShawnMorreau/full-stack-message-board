const mongoose=require("mongoose");
mongoose.set("debug",true);
mongoose.set('useCreateIndex', true);
mongoose.Promise=Promise;

mongoose.connect("mongodb://localhost/warbler",{
    keepAlive:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");