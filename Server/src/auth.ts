
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request} from 'express'; 
import dotenv from 'dotenv';
import User from './db/userSchema';

dotenv.config();

const GOOGLE_CLIENT_ID = "72365737421-6chsiivuem3to740gtbeep4b4gtr75eg.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback",
  passReqToCallback: true,
},
async function(request: Request, accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            console.log('Usuario ya existe en MongoDB');

           
            if (request.res) {
              request.res.cookie('userId', existingUser.id);
              request.res.cookie('displayName', existingUser.displayName);
              console.log('Cookies creadas');
            }

            request.login(existingUser, (loginError) => {
              if (loginError) {
                return done(loginError);
              }
              console.log('Usuario logueado correctamente');
              return done(null, existingUser);
            });
        } else {
            const newUser = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
            });

            try {
                await newUser.save();
                console.log('Usuario guardado correctamente en MongoDB');

                
                if (request.res) {
                  request.res.cookie('userId', newUser.id);
                  request.res.cookie('displayName', newUser.displayName);
                  console.log('Cookies creadas');
                }

                request.login(newUser, (loginError) => {
                  if (loginError) {
                    return done(loginError);
                  }
                  console.log('Usuario logueado correctamente');
                  return done(null, newUser);
                });
            } catch (saveError) {
                console.error('Error al guardar el usuario en MongoDB:', saveError);
                done(saveError, null);
            }
        }
    } catch (err) {
        console.error('Error durante la autenticación de Google:', err);
        done(err, null);
    }
}));

passport.serializeUser(function(user: any, done: any) {
    try {
        done(null, user.id);
        console.log('Usuario serializado', user);
    } catch (err) {
        console.error('Error al serializar el usuario:', err);
        done(err, null);
    }
});

passport.deserializeUser(async function(id: string, done: any) {
    try {
        const user = await User.findById(id);
        done(null, user);
        console.log('Usuario deserializado', user);
    } catch (error) {
        console.error('Error al deserializar el usuario:', error);
        done(error, null);
    }
});

export default passport;





