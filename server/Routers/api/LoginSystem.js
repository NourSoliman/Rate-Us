    const express = require(`express`)
    const router = express.Router();
    const bcrypt = require(`bcrypt`)
    const User = require(`../../models/User.js`)
    const jwt = require(`jsonwebtoken`)
    const authenticate = require(`../../middleware/auth`)

    router.get(`/signUp`, (req , res) => {
        res.send(`Yea its right Router`)
    })

    router.post(`/signUp` , async(req , res) => {
        const secret = process.env.JWT_SECRET
        try {
            const {userName , email , password , confirmPassword} = req.body;
            const existUser = await User.findOne({email})
            if(existUser) {
            return res.status(400).json({error:`User with this email already exist`})
            }
            if(password !== confirmPassword) {
            return res.status(400).json({error:`Passwords do not match`})
            }
            const hashedPassword =  await bcrypt.hash(password , 10)
            const user = new User({email , password:hashedPassword, confirmPassword,userName})
            await user.save()
            const token = jwt.sign({userId: user._id},secret)
            // res.cookie(`token`, token, {
            //     httpOnly:true,
            // })
            res.json({ token: token });

            res.status(200).json({success:true})
        } catch(error){
            console.log(error);
        }
    })
    //Login Route
    router.get(`/login`, (req , res) => {
        res.send(`yea its Login route`)
    })
    router.post(`/login` ,   async (req , res) => {
        
        const secret = process.env.JWT_SECRET
        // const secret = "anythingtillichooseanotherpassword"
        try {
        const {email , password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({error:`Invaild name or Password`})
        }
        const hashedPassword = await bcrypt.compare(password , user.password)
        if(!hashedPassword) {
            return res.status(400).json({error:`Invaild email or Password`}) 
        }   
        // const token = jwt.sign({userId : user._id} , secret);
        const token = jwt.sign({userId:user._id} , secret , { expiresIn: '1h' })
        const refreshToken = jwt.sign({userId:user._id},process.env.REFRESH_SECRET,{expiresIn:`1d`})
        
        res.cookie(`token`,token , {
            httpOnly:true,
            secure:true,
            sameSite:"none"
        })
        // res.json({token:token})
        // console.log(`login`,token);
        return res.status(200).send({
            msg:"login successful...",
            email:user.userName,
            token
        })
        }catch(error) {
            console.log(error);
        }
    })

    //logout
    router.get(`/logOut` , (req  , res) => {
        res.send(`yea its logout Route`)
    })

        router.post(`/logOut` , authenticate , async (req , res) => {
            console.log('logOut route hit');
            try {
                if(req.user && req.user.token) {
                    req.user.token = req.user.token.filter((token) => {
                        return token.token !== req.token
                    })
                    console.log('req.user:', req.user);
                    await req.user.save();
                    // res.cookie('token', ' ', { maxAge:0 });
                    res.clearCookie('token');
                    // req.session.destroy();
                    console.log("Cookie cleared");
                    res.status(200).json({message: `User logged Out`}); 
                }
            } catch(error) {
                console.log(error);
            }
        })



    //get User Name of logged in account
    router.get(`/getUserName` , authenticate ,  async (req , res) => {
        try {
            const user = req.user
            const userName = user.userName
            res.sendStatus(`200`).json({userName})
        } catch(error) {
            console.log(error);
        }
    })
    module.exports = router