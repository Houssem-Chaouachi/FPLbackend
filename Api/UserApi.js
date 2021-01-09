const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




//  login
router.post('/login', async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    const ValidEmailuser = user ? user.email : undefined;
    if (ValidEmailuser ) {
            const validpasse = await bcrypt.compare(req.body.password,user.password);
            if (!validpasse) {
                return res.status(401).send({ message: "wrong email or password" }); 
            } else {
                let token = jwt.sign({
                    data: { _id: user._id,
                    name: user.name,
                    email: user.email, }
                },
                "token");
                res.send({ message: token, role:'user' });
            }   
    } else {
     return res.status(401).send({ message: "wrong email or password" });   
    }
});
//Register
router.post('/register', async(req, res)=>{
    const user = User(req.body);
    const uniqueuser = await User.findOne({ email: req.body.email });

    if (uniqueuser) {
        return res.status(400).send({ message: "email already in use" });
    } else {
        const salt = await bcrypt.genSalt(10);
        user.password  = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

// get all users
router.get('/', async(req,res) => {
    const user = await User.find()
    res.send(user)
})



module.exports = router;