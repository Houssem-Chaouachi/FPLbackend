
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 5,
    message: 'Vous avez dépassé les 5 vote par jour',
    headers: true,
});
