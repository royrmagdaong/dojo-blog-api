const User = require('../models/user')

async function checkEmail(req, res, next){
    try {
        await User.findOne({ email: req.body.email}).then( async (emailExists) => {
            if(emailExists) return res.status(500).json({response: false, message: "email already exists."})
            next()
        }).catch(error=>{
            return res.status(500).json({ response: false, message: error.message })
        })
    } catch (error) {
        return res.status(500).json({ response: false, message: error.message })
    }
}

module.exports = checkEmail