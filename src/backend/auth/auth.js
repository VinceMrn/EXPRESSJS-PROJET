const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../config/database'); 

let users = [
    { username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' }, 
]; 

passport.use(new LocalStrategy(async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email: email } }); 
        if (!user) return done(null, false, { message: 'Utilisateur non trouvé' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Mot de passe incorrect' });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, 'votre_secret', { expiresIn: '1h' });
};

module.exports = { users, generateToken }; 