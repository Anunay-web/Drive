const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:8}),
    body('password').trim().isLength({min:6}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array(),
        message: 'Invalid data'
        });
    }

    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);//10 salt rounds is enough if we are not dealing with highly sensitive data and it increases then performance may affects
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })


    res.redirect('/user/login');
})

router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',
    body('email').trim().isEmail().isLength({min:8}),
    body('password').trim().isLength({min:6}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
        const error = validationResult(req.body);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array(),
                message: 'Invalid data'
            })
        }
        const {username,password} = req.body;
        const user = await userModel.findOne({
            username: username
        })
        if(!user){
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }
        //after both are correct we generate a token and send it to the user
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
    )

    //we send it to frontend in cookies
    res.cookie('token',token);
    res.redirect('/');
    }
)

module.exports = router;
