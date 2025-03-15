/*const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log("Auth Middleware Triggered");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access Denied. No Token Provided." });
    }

    try {
        const token = authHeader.split(' ')[1];  // Extract token after "Bearer "
        console.log("Token received:", token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };

        next();
    } catch (error) {
        console.error("Invalid Token:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};*/



const jwt = require('jsonwebtoken')


module.exports = function(req , res , next){
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token , process.env.jwt_secret)
        req.user = { userId: decoded.userId };
        req.body.userId = decoded.userId

        next()
    } catch (error) {
        res.status(401).send({ success: false, message: "Invalid token" });
    }
}