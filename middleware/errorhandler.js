const {constants} = require("../constants")

const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 

switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.status(statusCode).json({ title:"validation Failed" , message: err.message,  stackTrace: err.stack, });
        break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title:"NOT FOUND" , message: err.message,  stackTrace: err.stack, });
            break;
            case constants.FORBIDDEN:
            res.status(statusCode).json({ title:"Forbidden" , message: err.message,  stackTrace: err.stack, });
            break;
            case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title:"unauthorized" , message: err.message,  stackTrace: err.stack, });
            break;
            case constants.SERVER_ERROR:
            res.status(statusCode).json({ title:"Server error" , message: err.message,  stackTrace: err.stack, });
            break;
    
    default:
        console.log("No  error ,All good !")
        break;
}
}
   
  
  module.exports = errorhandler; 
