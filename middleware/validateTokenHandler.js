const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ValidateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract token
        token = authHeader.split(" ")[1];

        // Verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            // Attach the decoded user to the request
            req.user = decoded.user;
            next();  // Call the next middleware or route handler
        });
    } else {
        // If no token is provided
        res.status(401);
        throw new Error("Authorization token is missing");
    }
});

module.exports = ValidateToken;
