const jwt = require("jsonwebtoken");


const authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({status: "fail", data: "An authtoken is required for authentication."});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({status: "fail", data: err.message});
    }
    return next();
};

module.exports = authorize;