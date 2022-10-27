require('dotenv').config();
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

module.exports = {
    signInUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email}).where('deleted_at').equals(null);
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) return res.status(500).json({response:false, message: err.message});
                    if(result){
                        jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token) => {
                            if(err) return res.status(500).json({response:false, message: err.message});
                            return res.status(200).json({
                                response: true, 
                                data:{
                                    id: user._id,
                                    role: user.role,
                                    email: user.email,
                                    token    
                                }
                            })
                        })
                    }
                })
            }else{
                return res.status(404).json({response: false, message:'user is not registered!'});
            }
        } catch (error) {
            return res.status(500).json({response: false, message:error.message});
        }
    },
    createUser: async (req, res) => {
        try {
            Role.find({}, async (err, roles) => {
                if(err) return res.status(500).json({response: false, message:err.message})
                
                let email = req.body.email
                let role = roles[0].USER
                let password = req.body.password

                await bcrypt.hash(password, saltRounds, async (error, hashPassword) => {
                    if(error) return res.status(500).json({response: false, message:error.message});
                    let user = await new User({
                        role: role,
                        email: email,
                        password: hashPassword
                    })
                    
                    await user.save( async (error, newUser) => {
                        if(error) return res.status(500).json({response: false, message:error.message});
                        if(newUser){
                            return res.status(201).json({response: true, message: `${email} is created successfully!`})
                        }else{
                            return res.status(500).json({response: true, message: `Failed!`})
                        }
                    })
                });
            });
        } catch (error) {
            return res.status(500).json({response: false, message:error.message})
        }
    },
    createAdmin: async (req, res) => {
        try {
            Role.find({}, async(err, roles)=> {
                if(err) return res.status(500).json({response: false, message:err.message});
                let email = req.body.email
                let role = roles[0].ADMIN
                let password = req.body.password

                await bcrypt.hash(password, saltRounds, async (error, hashPassword) => {
                    if(error) return res.status(500).json({response: false, message:error.message});
                    let user = await new User({
                        role: role,
                        email: email,
                        password: hashPassword
                    })
                    
                    await user.save( async (error, newUser) => {
                        if(error) return res.status(500).json({response: false, message:error.message});
                        if(newUser){
                            return res.status(201).json({response: true, message: `${email} is created successfully!`})
                        }else{
                            return res.status(500).json({response: true, message: `Failed!`})
                        }
                    })
                });
            })
        } catch (error) {
            return res.status(500).json({response: false, message: error.message});
        }
    }
}