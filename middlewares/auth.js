import passport from "passport";

export default function auth(req, res, next) {
    passport.authenticate(
        "jwt",
        {
            session: false
        }, (err, user) => {

            if (!user || err) {
                return res.status(401).json({
                    "message": "Not authorized"
                });
            }

            const token = req.get('Authorization').split(' ')[1];

            if (user.token !== token) {
                return res.status(401).json({
                    "message": "Not authorized"
                });
            }

            req.user = user;
            next();
        }
    )(req, res, next);
}