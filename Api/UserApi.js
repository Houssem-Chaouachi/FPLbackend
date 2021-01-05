const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createAccountLimiter = require('../rateLimiter') 

router.get('/', createAccountLimiter, passport.authenticate('bearer', { session: false }),  (req, res) => {
    User.find({}).then((listUsers) => {
        res.send(listUsers);
    }
    );
});

router.get('/:id',  passport.authenticate('bearer', { session: false }), async (req, res) => {
    const patient = await User.findById(req.params.id)
    res.send(patient);
} );

router.post('/', createAccountLimiter, passport.authenticate('bearer', { session: false }), (req, res) => {
    // les promisse (then)  (recommender)
    User.create(req.body).then((createdUser) => {
        res.send(createdUser);
    });
});
//  login
router.post('/login', async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    const ValidEmailuser = user ? user.email : undefined;
    if (ValidEmailuser ) {
            const validpasse = await bcrypt.compare(req.body.password,user.password);
            if (!validpasse) {
                return res.status(401).send({ message: "wrong email or password" }); // verification validité password user//
            } else {
                let token = jwt.sign({
                    data: user 
                },
                "secret");
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
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

// reset Password

module.exports = router;