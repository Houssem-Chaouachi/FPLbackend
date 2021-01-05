const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../Config/passport')(passport);

router.get('/',   passport.authenticate('jwt', { session: false }),  (req, res) => {
    User.find({}).then((listUsers) => {
        res.send(listUsers);
    }
    );
});

router.get('/:id',  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const patient = await User.findById(req.params.id)
    res.send(patient);
} );

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // les promisse (then)  (recommender)
    User.create(req.body).then((createdUser) => {
        res.send(createdUser);
    });
});
//  login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email: email }
    User.findOne(query).then((user) => {
        if (!user) {
            return res.json({ success: false, msg: 'Patient not found' });
        }
        console.log(user);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, msg: 'verify your password' });
            }
            console.log(isMatch);
            if (isMatch) {
                const token = jwt.sign(user.toJSON(),'token', {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: token,
                    id: user.id,
                });
                console.log(token);

            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }

        });

    });
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