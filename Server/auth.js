const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('./db/userSchema');

const GOOGLE_CLIENT_ID = "72365737421-4vob7i0jok1j6drm83jdklb260i4njbi.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
async function(request, accessToken, refreshToken, profile, done) {
    try{
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            console.log('Usuario ya existe en MongoDB');
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
        });
        await newUser.save();
        done(null, newUser);
        console.log('Usuario guardado correctamente en MongoDB');
    }catch(err){
        done(err, null);
    }
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log('Usuario serializado', user);
});


passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        
        done(null, user);
        console.log('Usuario deserializado', user);
       
    } catch (error) {
        done(error, null);
    }
});

