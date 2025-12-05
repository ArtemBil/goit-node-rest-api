import passport from 'passport';
import passportJWT from 'passport-jwt';
import userRepository from '../../../repositories/user.js';

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const secret = process.env.JWT_SECRET;
const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(params, function (payload, done) {
        userRepository.findById(payload.id)
            .then((user) => {
                if (!user) {
                    return done(new Error('User not found'));
                }
                return done(null, user);
            })
            .catch(err => done(err));
    })
);
