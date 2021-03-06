const express =require('express');
const router = express.Router();
const passport = require('passport');
const Sondage = require('../Models/voteSchema');
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const createAccountLimiter = require('../rateLimiter') 

router.post('/create',  passport.authenticate('bearer', { session: false }), (req, res) => {
  
    Sondage.create(req.body).then((createdSondage) => {
        res.send(createdSondage);
    });
});

router.get('/', passport.authenticate('bearer', {session:false}),  async(req,res)=>{
    const sujet = await Sondage.find({});
    res.send(sujet);
})
// get sondage by id
router.get('/:idSondage',  passport.authenticate('bearer', { session: false }), async (req, res) => {
    const sondage = await Sondage.findById(req.params.idSondage)
    if (!sondage)
      return res.status(400).json({ message: "sondage n'existe pas" });
    res.send(sondage);
} );

// vote 
router.put('/vote/:id',createAccountLimiter, async(req, res) =>{
const vote = await Sondage.findById(req.params.id);
vote.choix =req.body.choix;
vote.totale += 1;
if(vote.choix == 'oui') vote.oui +=1;
else if(vote.choix == 'non') vote.non +=1;
 await vote.save();
 res.send({ message: 'vote réusite'})
 
});

 module.exports = router