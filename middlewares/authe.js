const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            message: 'Access Denied'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();

        
    } catch (error) {
        return res.status(400).json({
            message: 'Access Denied'
        })
        
    }

}

module.exports = auth;