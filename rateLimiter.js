
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 heures en millisecondes 
    max: 10,
    message: 'Vous avez dépassé les 10 commentaires en 24 heures!',
    headers: true,
});
