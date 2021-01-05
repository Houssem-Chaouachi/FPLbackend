const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/',  passport.authenticate('bearer', { session: false }),  (req, res) => {
    User.find({}).then((listUsers) => {
        res.send(listUsers);
    }
    );
});

router.get('/:id',  passport.authenticate('bearer', { session: false }), async (req, res) => {
    const patient = await User.findById(req.params.id)
    res.send(patient);
} );

router.post('/', passport.authenticate('bearer', { session: false }), (req, res) => {
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
router.post('/register', (req, res) => {
    let newPatient = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        tel: req.body.tel,
        datePoste: new Date().getDate(),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        patients: []
    });
    const queryy = { email: newPatient.email }
    User.findOne(queryy).then((user) => {
        if (user) {
            return res.json({ success: false, msg: 'User is already exist' });
        }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register patient' });
            } else {
                newPatient.password = hash;
                newPatient.save();
                res.json({ success: true, msg: 'Patient registered' });
            }
        });
    });
});

})

// reset Password

module.exports = router;